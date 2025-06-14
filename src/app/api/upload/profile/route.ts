import { NextRequest, NextResponse } from "next/server";
import { withApiAuth, ApiAuthContext } from "../../middleware";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

// Schema for file validation
const fileSchema = z.object({
  type: z.string().startsWith("image/"),
  size: z.number().max(5 * 1024 * 1024), // 5MB max
});

/**
 * Handles profile image upload
 * - Validates that file is an image and within size limits
 * - Generates a UUID for the filename
 * - Uploads to R2 bucket with Content-Type header
 * - Returns the URL of the uploaded file
 */
export const POST = withApiAuth(
  async (req: NextRequest, { env }: ApiAuthContext) => {
    try {
      // Make sure we have the R2 bucket available
      if (!env || !env.USER_UPLOADS) {
        return NextResponse.json(
          { error: "Storage service unavailable" },
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
      const fileExtension = file.name.split(".").pop() || "";
      const fileName = `${uuidv4()}.${fileExtension}`;
      const profilePath = `profiles/${fileName}`;

      // Convert file to ArrayBuffer for upload
      const arrayBuffer = await file.arrayBuffer();

      // Upload to R2
      await env.USER_UPLOADS.put(profilePath, arrayBuffer, {
        httpMetadata: {
          contentType: file.type,
        },
      });

      // Return the URL and path of the uploaded file
      return NextResponse.json({
        success: true,
        url: `https://cdn.khmercoder.com/${profilePath}`,
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
