import "server-only";
import crypto from "node:crypto";
import { createAdminClient, supabaseEnv } from "@/lib/supabase/server";
import { cvFileError, sniffCvType } from "@/lib/cv-upload";

// CV uploads for job applications.
//
// The files live in a PRIVATE storage bucket: no storage policies, so only the
// server (service-role key) can read or write them. The admin console links to
// a 60-second signed URL, the same shape as member downloads.
//
// Storage is best-effort. If Supabase isn't configured, or migration 0012 hasn't
// created the bucket yet, the CV still reaches the hiring team as an attachment
// on the notification email.

export const CV_BUCKET = "job-applications";

export type CvUpload = {
  bytes: Buffer;
  name: string;
  size: number;
  type: string;
};

/**
 * Check an uploaded CV and read it into memory. Returns the bytes when the
 * file is one we accept, or the reason it isn't.
 */
export async function readCvUpload(
  file: File,
): Promise<{ ok: true; cv: CvUpload } | { ok: false; error: string }> {
  const problem = cvFileError(file);
  if (problem) return { ok: false, error: problem };

  const bytes = Buffer.from(await file.arrayBuffer());
  if (!sniffCvType(bytes)) {
    return {
      ok: false,
      error: "That file doesn't look like a PDF, a Word document or an image.",
    };
  }
  return {
    ok: true,
    cv: {
      bytes,
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
    },
  };
}

/** Store the CV in the private bucket. Returns its path, or null on failure. */
export async function uploadCv(cv: CvUpload): Promise<string | null> {
  const { url, secret } = supabaseEnv();
  if (!url || !secret) return null;

  const safe =
    cv.name
      .replace(/[^a-z0-9._-]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "cv";
  const now = new Date();
  const path = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${crypto.randomUUID()}-${safe}`;

  const { error } = await createAdminClient()
    .storage.from(CV_BUCKET)
    .upload(path, cv.bytes, { contentType: cv.type, upsert: false });
  if (error) {
    console.error("CV upload failed:", error.message);
    return null;
  }
  return path;
}

/** 60-second signed link to a stored CV. Null when it can't be signed. */
export async function signedCvUrl(
  path: string,
  filename?: string,
): Promise<string | null> {
  const { url, secret } = supabaseEnv();
  if (!url || !secret) return null;
  const { data, error } = await createAdminClient()
    .storage.from(CV_BUCKET)
    .createSignedUrl(path, 60, filename ? { download: filename } : undefined);
  if (error || !data) {
    console.error("CV signed URL failed:", error?.message);
    return null;
  }
  return data.signedUrl;
}
