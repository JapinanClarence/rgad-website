import { createClient } from "@gad/supabase/client";

/**
 * Storage service for the admin app.
 *
 * Uploads run through the browser Supabase client because `File` objects
 * only exist client-side (form inputs, drag-and-drop, etc). Call these
 * functions from client components, then persist the returned `url` on the
 * relevant record (e.g. `cover_image`, `pdf_url`) through the existing
 * server-backed services/actions.
 *
 * Buckets referenced here (`images`, `documents`) must exist in the
 * Supabase project with storage RLS policies that allow authenticated
 * inserts and public reads. This module does not create buckets.
 */

type UploadResult =
  | { success: true; url: string; path: string; error?: never }
  | { success: false; error: string; url?: never; path?: never };

type DeleteResult =
  | { success: true; error?: never }
  | { success: false; error: string };

type UploadOptions = {
  /** Sub-folder inside the bucket, e.g. "covers" or "articles". */
  folder?: string;
  /** Overwrite a file already at the resolved path. Defaults to false. */
  upsert?: boolean;
};

const IMAGE_BUCKET = "images";
const IMAGE_MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const IMAGE_ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const PDF_BUCKET = "documents";
const PDF_MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20MB
const PDF_ALLOWED_TYPES = ["application/pdf"];

function formatMaxSize(bytes: number): string {
  return `${Math.round(bytes / (1024 * 1024))}MB`;
}

function sanitizeFileName(fileName: string): string {
  const lastDot = fileName.lastIndexOf(".");
  const name = lastDot > 0 ? fileName.slice(0, lastDot) : fileName;
  const ext = lastDot > 0 ? fileName.slice(lastDot) : "";

  const safeName = name
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  return `${safeName || "file"}${ext.toLowerCase()}`;
}

function buildFilePath(fileName: string, folder?: string): string {
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const safeFileName = sanitizeFileName(fileName);
  const segments = [folder?.trim().replace(/^\/+|\/+$/g, ""), unique].filter(
    Boolean,
  );

  return `${segments.join("/")}-${safeFileName}`;
}

async function uploadToBucket(
  bucket: string,
  file: File,
  allowedTypes: string[],
  maxSizeBytes: number,
  options?: UploadOptions,
): Promise<UploadResult> {
  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: `Unsupported file type "${file.type || "unknown"}". Allowed types: ${allowedTypes.join(", ")}`,
    };
  }

  if (file.size > maxSizeBytes) {
    return {
      success: false,
      error: `File is too large. Maximum size is ${formatMaxSize(maxSizeBytes)}.`,
    };
  }

  const supabase = createClient();
  const path = buildFilePath(file.name, options?.folder);

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: options?.upsert ?? false,
      contentType: file.type,
    });

  if (error || !data) {
    return {
      success: false,
      error: error?.message ?? "Failed to upload file",
    };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return { success: true, url: publicUrl, path: data.path };
}

/**
 * Uploads an image (jpeg, png, webp, gif) to the `images` bucket.
 * Use for things like issue cover images or summit photos.
 */
export async function uploadImage(
  file: File,
  options?: UploadOptions,
): Promise<UploadResult> {
  return uploadToBucket(
    IMAGE_BUCKET,
    file,
    IMAGE_ALLOWED_TYPES,
    IMAGE_MAX_SIZE_BYTES,
    options,
  );
}

/**
 * Uploads a PDF to the `documents` bucket.
 * Use for things like article PDFs.
 */
export async function uploadPdf(
  file: File,
  options?: UploadOptions,
): Promise<UploadResult> {
  return uploadToBucket(
    PDF_BUCKET,
    file,
    PDF_ALLOWED_TYPES,
    PDF_MAX_SIZE_BYTES,
    options,
  );
}

/**
 * Deletes a previously uploaded file given its bucket and storage path
 * (the `path` returned by `uploadImage`/`uploadPdf`, not the public URL).
 */
export async function deleteFile(
  bucket: string,
  path: string,
): Promise<DeleteResult> {
  const supabase = createClient();
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
