import type { MainDatabase, UserRecord } from "@/types";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { v4 as uuidv4 } from "uuid";
import * as schema from "@/libs/db/schema";
import { eq, sql } from "drizzle-orm";

interface UploadFileOptions {
  buffer: ArrayBuffer;
  filename: string;
  folder?: string;
}

interface UploadResponse {
  url: string;
}

const MAX_STORAGE_LIMIT = 1024 * 1024 * 1024; // 1 GB

export async function uploadFile(
  db: MainDatabase,
  user: UserRecord,
  { folder, filename, buffer }: UploadFileOptions
): Promise<UploadResponse> {
  const uuid = uuidv4();
  const extension = filename.split(".").pop() || "";
  const { env } = getCloudflareContext();

  if (!extension) {
    throw "Invalid file name: no extension found";
  }

  if (user.storageUsed + buffer.byteLength > MAX_STORAGE_LIMIT) {
    throw new Error(
      "You have reached your storage limit. Please delete some files or upgrade your plan."
    );
  }

  // Allow only image file, compression file, or pdf
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
  const compressionExtensions = ["zip", "rar", "tar", "gz"];
  const docExtensions = ["pdf"];

  const allowedExtensions = [
    ...imageExtensions,
    ...compressionExtensions,
    ...docExtensions,
  ];

  if (!allowedExtensions.includes(extension.toLowerCase())) {
    throw new Error(
      "This extension is not allowed. If you think this is a mistake, please contact support."
    );
  }

  const generatedFilename = `${uuid}.${extension}`;
  const path = [folder ?? "", generatedFilename].filter(Boolean).join("/");

  // This ensures the mapping has all allowed extensions
  const mappingContentType: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    zip: "application/zip",
    rar: "application/x-rar-compressed",
    tar: "application/x-tar",
    gz: "application/gzip",
    pdf: "application/pdf",
  };

  const contentType =
    mappingContentType[extension.toLowerCase()] || "application/octet-stream";

  await env.USER_UPLOADS.put(path, buffer, {
    httpMetadata: {
      contentType,
    },
  });

  const url = `https://cdn.khmercoder.com/${path}`;

  await db.batch([
    db.insert(schema.userUpload).values({
      id: uuid,
      userId: user.id, // Use the authenticated user's ID
      fileName: filename ?? generatedFilename,
      fileType: contentType,
      fileSize: buffer.byteLength,
      fileUrl: url,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    db
      .update(schema.user)
      .set({
        storageUsed: sql`${user.storageUsed} + ${
          Number(buffer.byteLength) ?? 0
        }`,
      })
      .where(eq(schema.user.id, user.id)),
  ]);

  return {
    url,
  };
}
