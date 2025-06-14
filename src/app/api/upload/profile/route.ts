import { NextRequest, NextResponse } from "next/server";
import { withApiAuth, ApiAuthContext } from "../../middleware";
import * as schema from "@/libs/db/schema";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { eq } from "drizzle-orm";

// Schema for file validation
const fileSchema = z.object({
  type: z.string().startsWith("image/"),
  size: z.number().max(5 * 1024 * 1024), // 5MB max
});

/**
 * Handles profile image upload
 * - Validates that file is an image and within size limits
 * - Generates a UUID for the filename
 * - Processes the image to 512x512 using Cloudflare Images
 * - Uploads to R2 bucket with Content-Type header
 * - Returns the URL of the uploaded file
 */
export const POST = withApiAuth(
  async (req: NextRequest, { env, user, db }: ApiAuthContext) => {
    try {
      // Make sure we have the required services available
      if (!env || !env.USER_UPLOADS || !env.IMAGES) {
        return NextResponse.json(
          { error: "Storage or image processing service unavailable" },
          { status: 503 }
        );
      }

      // Get the form data from the request
      const formData = await req.formData();
      const file = formData.get("file") as File | null;

      // Validate file exists
      if (!file) {
        return NextResponse.json(
          { error: "No file provided" },
          { status: 400 }
        );
      }

      // Validate file type and size
      try {
        fileSchema.parse({
          type: file.type,
          size: file.size,
        });
      } catch (error) {
        return NextResponse.json(
          { error: "Invalid file. Must be an image under 5MB" },
          { status: 400 }
        );
      }

      // Generate a UUID for the filename
      const uuid = uuidv4();
      // Always use .webp extension since we transform to WebP format
      // But keep the original extension as a fallback if transformation fails
      const originalExtension = file.name.split(".").pop() || "";
      let fileName = `${uuid}.webp`;
      let profilePath = `profiles/${fileName}`;
      let useWebP = true;

      // Convert file to ArrayBuffer for processing
      const arrayBuffer = await file.arrayBuffer();

      // Use Cloudflare Images for image resizing
      let resizedImageData;

      try {
        // Create a readable stream from the array buffer
        const imageStream = new ReadableStream({
          start(controller) {
            controller.enqueue(new Uint8Array(arrayBuffer));
            controller.close();
          },
        });

        // Use the Cloudflare Images binding to transform the image
        const transformer = env.IMAGES.input(imageStream);

        // Apply resize transformation to 512x512
        const transformed = transformer.transform({
          width: 512,
          height: 512,
          fit: "cover",
        });

        // Get the output as webp for better compression
        const result = await transformed.output({
          format: "image/webp",
          quality: 90,
        });

        // Get the transformed image as response
        const resizedImageResponse = result.response();
        resizedImageData = await resizedImageResponse.arrayBuffer();
      } catch (imageError) {
        console.error("Image processing error:", imageError);
        // Fallback to original image if resizing fails
        resizedImageData = arrayBuffer;

        // If transformation failed, use the original extension instead
        fileName = `${uuid}.${originalExtension}`;
        profilePath = `profiles/${fileName}`;
        useWebP = false;
      }

      // Upload the resized image to R2
      await env.USER_UPLOADS.put(profilePath, resizedImageData, {
        httpMetadata: {
          // Use the WebP format when resizing was successful, otherwise keep original format
          contentType: useWebP ? "image/webp" : file.type,
        },
      });

      const finalPath = `https://cdn.khmercoder.com/${profilePath}`;

      // Update user profile image in the database
      await db
        .update(schema.user)
        .set({
          image: finalPath,
        })
        .where(eq(schema.user.id, user.id));

      // Return the URL and path of the uploaded file
      return NextResponse.json({
        success: true,
        url: finalPath,
        path: profilePath,
      });
    } catch (error) {
      console.error("Profile upload error:", error);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }
  }
);

// Configure size limit for this route
export const config = {
  api: {
    bodyParser: false,
  },
};
