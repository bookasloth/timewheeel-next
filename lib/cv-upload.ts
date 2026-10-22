// Rules for the CV / resume a candidate uploads on the job application form.
// Shared by the browser (instant feedback) and the lead API (the check that
// actually decides), so the two can't drift apart.
//
// Kept free of server imports on purpose: the apply form is a client component
// and imports this module directly.

export const CV_MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export const CV_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "avif",
  "pdf",
  "doc",
  "docx",
] as const;

export const CV_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

/** The `accept` attribute for the file input. */
export const CV_ACCEPT = [
  ...CV_EXTENSIONS.map((e) => `.${e}`),
  "image/*",
  "application/pdf",
].join(",");

export function cvExtension(name: string): string {
  const m = /\.([a-z0-9]+)$/i.exec(name.trim());
  return m ? m[1].toLowerCase() : "";
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Why this file can't be uploaded, or null when it's fine.
 *
 * The extension decides, because Windows browsers often report an empty MIME
 * type for .docx. A declared MIME type, when there is one, has to agree with
 * what we accept.
 */
export function cvFileError(file: {
  name: string;
  type?: string;
  size: number;
}): string | null {
  if (!file.size) return "That file is empty. Pick another one.";
  if (file.size > CV_MAX_BYTES) {
    return `That file is ${formatBytes(file.size)}. The limit is 5 MB.`;
  }
  const ext = cvExtension(file.name);
  if (!ext || !(CV_EXTENSIONS as readonly string[]).includes(ext)) {
    return "Upload a PDF, a Word document (doc/docx) or an image (jpg, png, webp, gif).";
  }
  const type = (file.type || "").toLowerCase();
  if (type && !(CV_MIME_TYPES as readonly string[]).includes(type)) {
    return "That file type isn't supported. Upload a PDF, a Word document or an image.";
  }
  return null;
}

/**
 * The file's real type, read from its first bytes. Returns null when the bytes
 * don't match anything we accept, which is how a renamed .exe gets turned away
 * at the API even though it passed the extension check in the browser.
 */
export function sniffCvType(bytes: Uint8Array): string | null {
  const starts = (...s: number[]) => s.every((v, i) => bytes[i] === v);
  const ascii = (i: number, s: string) =>
    s.split("").every((c, j) => bytes[i + j] === c.charCodeAt(0));

  if (ascii(0, "%PDF-")) return "application/pdf";
  if (starts(0xff, 0xd8, 0xff)) return "image/jpeg";
  if (starts(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) return "image/png";
  if (ascii(0, "GIF87a") || ascii(0, "GIF89a")) return "image/gif";
  if (ascii(0, "RIFF") && ascii(8, "WEBP")) return "image/webp";
  if (ascii(4, "ftyp") && (ascii(8, "avif") || ascii(8, "avis"))) return "image/avif";
  if (starts(0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1)) return "application/msword";
  if (starts(0x50, 0x4b, 0x03, 0x04)) {
    // ZIP container: .docx is a zip. The inner entries aren't visible here, so
    // the extension carries the rest of the decision.
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  return null;
}
