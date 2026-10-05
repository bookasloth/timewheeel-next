import fs from "node:fs";
import path from "node:path";

// Build-time check that the screenshots a case study points at actually exist in
// /public. next/image throws at runtime on a missing path rather than degrading,
// so a case study can ship before its screenshots are captured. Resolving the
// paths here lets the template skip the comparison section entirely until the
// files land, with no code change on their side.
//
// Paths are public-root relative ("/case-studies/x/before.png"). This mirrors
// lib/seo-client-logos.ts, which reads public/ the same way.

/** Folder on disk, relative to the project root. */
const PUBLIC_DIR = path.join(process.cwd(), "public");

export function publicAssetExists(src: string): boolean {
  if (!src.startsWith("/")) return false;
  // Reject traversal before touching the filesystem.
  const rel = path.normalize(src).replace(/^([/\\])+/, "");
  if (rel.startsWith("..")) return false;
  try {
    return fs.statSync(path.join(PUBLIC_DIR, rel)).isFile();
  } catch {
    return false;
  }
}

/** True only when every src given resolves to a real file. */
export function publicAssetsExist(srcs: (string | undefined)[]): boolean {
  return srcs.every((src) => !!src && publicAssetExists(src));
}