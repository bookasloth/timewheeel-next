import fs from "node:fs";
import path from "node:path";

// Client logo wall for /social-media-marketing-company-in-nagpur.
// The list is read straight from /public/seo-client at build time, so dropping
// a file in that folder is the only step needed to put a client on the wall.
//
// The filename drives everything: it sets the label and picks the treatment.
//   digigold.png              -> gold mark on transparency -> logo chip
//   photo-brain-valley.png    -> photograph              -> thumbnail
//
// Name logo files after the company. Prefix a photo with "photo-".

export type ClientLogo = {
  /** Bare filename, used as the React key. */
  file: string;
  /** Public path, safe to hand to next/image. */
  src: string;
  /** Human label shown beside the mark. */
  label: string;
  /** True for photographs, which render as a crop-to-fill thumbnail rather
   *  than a mark centred on a white plate. */
  photo: boolean;
  /** True for near-black artwork, which cannot carry brand colour on the ink
   *  wall and so renders as a white silhouette instead. */
  dark: boolean;
  /** Intrinsic pixel size read from the file header, so the mark can render at
   *  its true aspect with no letterbox wrapper. Null if the format is one we
   *  cannot read, in which case the caller falls back to a fixed box. */
  width: number | null;
  height: number | null;
};

/** Folder on disk, relative to the project root. */
const FOLDER = "public/seo-client";
/** Everything under public/ is served from the site root, so the "public/"
 *  segment is dropped when building the URL. */
const URL_PREFIX = "/seo-client";
const EXTENSIONS = new Set([".svg", ".png", ".webp", ".jpg", ".jpeg", ".avif"]);
/** Marks the asset as a photograph. */
const PHOTO_PREFIX = "photo-";

// Measured mean luminance of each asset's visible (non-transparent) pixels.
// The wall is --navy (#171717), luma ~23. Anything under ~45 is effectively
// black-on-black and cannot show brand colour there, so it is forced white.
// Re-measure and extend this list when you add artwork: open the PNG in any
// image tool and read its average colour, or just check the rendered page.
const DARK_LOGOS = new Set([
  "banarasee.png", // luma 30
  "disney+-hotstar.png", // luma 33
  "eureka.png", // luma 14
  "prenix.png", // luma 11
  "stone-and-acres.png", // luma 3
]);

// Words that should stay upper-case once they are not the first token.
const ACRONYMS = new Set([
  "ai",
  "cms",
  "crm",
  "hr",
  "it",
  "llm",
  "ngo",
  "seo",
  "ui",
  "uk",
  "url",
  "usa",
  "ux",
]);

function labelFromFilename(file: string): string {
  const stem = path
    .basename(file, path.extname(file))
    .slice(file.slice(0, PHOTO_PREFIX.length).toLowerCase() === PHOTO_PREFIX ? PHOTO_PREFIX.length : 0);
  return (
    stem
      .split(/[-_\s.]+/)
      .filter(Boolean)
      .map((word, i) => {
        const lower = word.toLowerCase();
        if (ACRONYMS.has(lower)) return lower.toUpperCase();
        // Keep interior capitals the author wrote (iPhone, HubSpot).
        if (i > 0 && word[0] === word[0].toUpperCase() && word.slice(1) !== word.slice(1).toLowerCase()) {
          return word;
        }
        return word[0].toUpperCase() + word.slice(1);
      })
      .join(" ") || stem
  );
}

// "logo2" before "logo10".
function naturalSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

/** Header prefix long enough for every format we read — PNG and WebP put their
 *  dimensions in the first 30 bytes, and JPEG logos carry their frame header
 *  well inside this. */
const HEADER_BYTES = 64 * 1024;

function readImageSize(file: string, buf: Buffer): { width: number; height: number } | null {
  const ext = path.extname(file).toLowerCase();

  // PNG: 8-byte signature, then the IHDR chunk, whose width/height are the
  // first two big-endian uint32s of the payload starting at byte 16.
  if (ext === ".png" && buf.length >= 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // JPEG: chain of marker segments; the first start-of-frame carries the size
  // after its 1-byte precision field. Segment payloads are length-prefixed, so
  // skip each one to reach the next. c4/c8/cc are not frame headers.
  if (ext === ".jpg" || ext === ".jpeg") {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i += 1;
        continue;
      }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
    return null;
  }

  // WebP: RIFF container followed by a VP8 (lossy), VP8L (lossless) or VP8X
  // (extended) chunk. Dimensions are 14-bit packed, not plain fields.
  if (ext === ".webp" && buf.length >= 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8 ") {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    if (chunk === "VP8L") {
      const packed = buf.readUInt32LE(21);
      return { width: (packed & 0x3fff) + 1, height: ((packed >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8X") {
      return { width: (buf.readUIntLE(24, 3) & 0xffffff) + 1, height: (buf.readUIntLE(27, 3) & 0xffffff) + 1 };
    }
  }

  // SVG and AVIF: caller falls back to a fixed box.
  return null;
}

function headerOf(file: string): Buffer {
  const fd = fs.openSync(file, "r");
  try {
    const buf = Buffer.alloc(HEADER_BYTES);
    const read = fs.readSync(fd, buf, 0, HEADER_BYTES, 0);
    return buf.subarray(0, read);
  } finally {
    fs.closeSync(fd);
  }
}

export function getClientLogos(): ClientLogo[] {
  const dir = path.join(process.cwd(), FOLDER);
  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    // Folder absent (fresh clone, CI without assets) -> render nothing.
    return [];
  }

  return files
    // Skip dotfiles and editor/OS scratch files like .DS_Store or _draft.png.
    .filter((f) => !f.startsWith(".") && !f.startsWith("_"))
    .filter((f) => EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort(naturalSort)
    .map((file) => {
      const photo = file.slice(0, PHOTO_PREFIX.length).toLowerCase() === PHOTO_PREFIX;
      const size = readImageSize(file, headerOf(path.join(dir, file)));
      return {
        file,
        src: `${URL_PREFIX}/${file}`,
        label: labelFromFilename(file),
        photo,
        dark: DARK_LOGOS.has(file.toLowerCase()),
        width: size?.width ?? null,
        height: size?.height ?? null,
      };
    });
}