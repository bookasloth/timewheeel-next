#!/usr/bin/env python3
"""img2video - turn a still image into a short HD video with motion.

Wraps ffmpeg (no other deps). One image or a whole folder.

Examples:
    python img2video.py photo.jpg                         # 10s, zoom-in, vertical reel
    python img2video.py photo.jpg -m panright -a wide     # pan, 16:9
    python img2video.py ./pics -m random                  # batch a folder
    python img2video.py photo.jpg -d 8 -m kenburns -a square
"""
import argparse
import os
import random
import shutil
import subprocess
import sys
import tempfile

# aspect -> output WxH (HD, even dims for h264)
ASPECTS = {
    "reel":   (1080, 1920),  # 9:16 vertical  (Instagram/TikTok/Shorts)
    "square": (1080, 1080),  # 1:1
    "wide":   (1920, 1080),  # 16:9
}

IMG_EXT = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tif", ".tiff"}
FPS = 30

# each motion returns the -vf filter string for a given output w,h and total frames n.
# oversample (scale up) first so zoom/pan stay sharp; zoompan does the move; then pad to exact frame.
def _base_scale(w, h):
    # scale up 4x so pan/zoom never shows soft pixels, keep aspect, let zoompan crop
    return f"scale={w*4}:{h*4}:force_original_aspect_ratio=increase"

def m_zoomin(w, h, n):
    return (f"{_base_scale(w,h)},"
            f"zoompan=z='min(zoom+0.0006,1.5)':d={n}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s={w}x{h}:fps={FPS}")

def m_zoomout(w, h, n):
    return (f"{_base_scale(w,h)},"
            f"zoompan=z='if(eq(on,0),1.5,max(1.001,zoom-0.0006))':d={n}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s={w}x{h}:fps={FPS}")

def m_panright(w, h, n):
    return (f"{_base_scale(w,h)},"
            f"zoompan=z=1.3:d={n}:x='(iw-iw/zoom)*on/{n}':y='ih/2-(ih/zoom/2)':s={w}x{h}:fps={FPS}")

def m_panleft(w, h, n):
    return (f"{_base_scale(w,h)},"
            f"zoompan=z=1.3:d={n}:x='(iw-iw/zoom)*(1-on/{n})':y='ih/2-(ih/zoom/2)':s={w}x{h}:fps={FPS}")

def m_kenburns(w, h, n):
    # zoom in while drifting toward top-right = classic doc look
    return (f"{_base_scale(w,h)},"
            f"zoompan=z='min(zoom+0.0005,1.4)':d={n}:x='(iw-iw/zoom)*on/{n}':y='(ih-ih/zoom)*(1-on/{n})':s={w}x{h}:fps={FPS}")

def m_still(w, h, n):
    return (f"scale={w}:{h}:force_original_aspect_ratio=decrease,"
            f"pad={w}:{h}:(ow-iw)/2:(oh-ih)/2")

MOTIONS = {
    "zoomin": m_zoomin, "zoomout": m_zoomout,
    "panright": m_panright, "panleft": m_panleft,
    "kenburns": m_kenburns, "still": m_still,
}


def build_filter(motion, w, h, n):
    vf = MOTIONS[motion](w, h, n)
    # pad guarantees exact even output dims regardless of rounding, then h264-safe pixel format
    vf += f",pad={w}:{h}:(ow-iw)/2:(oh-ih)/2,setsar=1,format=yuv420p"
    return vf


def has_alpha(src):
    r = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0",
         "-show_entries", "stream=pix_fmt", "-of", "csv=p=0", src],
        capture_output=True, text=True)
    pf = r.stdout.strip()
    return "a" in pf or "pal" in pf  # rgba/yuva/palette (webp/png with transparency)


def flatten(src, bg):
    """Composite a transparent image onto a solid bg -> temp opaque png. Returns path."""
    tmp = tempfile.NamedTemporaryFile(suffix=".png", delete=False).name
    subprocess.run(
        ["ffmpeg", "-y", "-i", src, "-filter_complex",
         f"color={bg}[c];[c][0]scale2ref[c][i];[c][i]overlay=format=auto:shortest=1,format=rgb24",
         "-frames:v", "1", tmp, "-loglevel", "error"], check=True)
    return tmp


def render(src, dst, motion, aspect, duration, bg="white"):
    tmp = None
    if has_alpha(src):
        tmp = flatten(src, bg)
        src = tmp
    try:
        return _render(src, dst, motion, aspect, duration)
    finally:
        if tmp and os.path.exists(tmp):
            os.remove(tmp)


def _render(src, dst, motion, aspect, duration):
    w, h = ASPECTS[aspect]
    n = int(duration * FPS)
    if motion == "random":
        motion = random.choice(["zoomin", "zoomout", "panright", "panleft", "kenburns"])
    vf = build_filter(motion, w, h, n)
    cmd = [
        "ffmpeg", "-y", "-loop", "1", "-i", src,
        "-t", str(duration), "-r", str(FPS),
        "-vf", vf,
        "-c:v", "libx264", "-preset", "medium", "-crf", "18",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart",
        dst,
    ]
    print(f"  [{motion}] {os.path.basename(src)} -> {os.path.basename(dst)}")
    r = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)
    if r.returncode != 0:
        sys.stderr.write(r.stderr[-1500:] + "\n")
        raise SystemExit(f"ffmpeg failed on {src}")
    return dst


def collect(path):
    if os.path.isdir(path):
        return sorted(os.path.join(path, f) for f in os.listdir(path)
                      if os.path.splitext(f)[1].lower() in IMG_EXT)
    return [path]


def main():
    if not shutil.which("ffmpeg"):
        raise SystemExit("ffmpeg not found on PATH. Install it first.")
    p = argparse.ArgumentParser(description="Turn an image (or folder) into a short HD video.")
    p.add_argument("input", help="image file or folder of images")
    p.add_argument("-m", "--motion", default="zoomin",
                   choices=list(MOTIONS) + ["random"], help="motion effect (default zoomin)")
    p.add_argument("-a", "--aspect", default="reel", choices=list(ASPECTS),
                   help="reel=9:16, square=1:1, wide=16:9 (default reel)")
    p.add_argument("-d", "--duration", type=float, default=10, help="seconds (default 10)")
    p.add_argument("-o", "--outdir", default=os.path.join(os.path.dirname(__file__), "out"),
                   help="output folder")
    p.add_argument("-b", "--bg", default="white",
                   help="background for transparent images (name or #hex, default white)")
    a = p.parse_args()

    imgs = collect(a.input)
    if not imgs:
        raise SystemExit(f"no images found in {a.input}")
    os.makedirs(a.outdir, exist_ok=True)
    print(f"{len(imgs)} image(s) -> {a.aspect} {ASPECTS[a.aspect]} {a.duration}s")
    for src in imgs:
        stem = os.path.splitext(os.path.basename(src))[0]
        dst = os.path.join(a.outdir, f"{stem}_{a.aspect}.mp4")
        render(src, dst, a.motion, a.aspect, a.duration, a.bg)
    print(f"done -> {a.outdir}")


if __name__ == "__main__":
    main()
