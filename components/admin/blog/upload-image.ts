"use client";

import { startImageUpload } from "@/lib/admin/blog-actions";

/** Upload an image straight to the blog-images bucket; resolves to its public URL. */
export async function uploadImage(file: File, onProgress?: (pct: number) => void): Promise<string> {
  const started = await startImageUpload({ name: file.name, size: file.size, type: file.type });
  if ("error" in started) throw new Error(started.error);
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", started.url);
    xhr.setRequestHeader("content-type", file.type);
    xhr.setRequestHeader("x-upsert", "false");
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress?.(Math.round((e.loaded / e.total) * 100));
    xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error("The upload failed. Try again.")));
    xhr.onerror = () => reject(new Error("The upload failed. Check your connection."));
    xhr.send(file);
  });
  return started.publicUrl;
}
