"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Upload, ImageIcon, Loader2, X, Check } from "lucide-react";
import { useSession } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/generated/card";
import { Button } from "@/components/generated/button";

export default function ProfileSetupPicturePage() {
  const router = useRouter();
  const { session } = useSession();
  const { toast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Get the current user image
  const userImage = session?.user?.image;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB.",
        variant: "destructive",
      });
      return;
    }

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file);
    setSelectedImage(objectUrl);
    setSelectedFile(file);

    // Reset upload progress when a new file is selected
    setUploadProgress(0);
  };

  const uploadImage = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);

      // Create form data
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const nextProgress = prev + Math.random() * 15;
          return nextProgress >= 90 ? 90 : nextProgress;
        });
      }, 300);

      // Upload the image
      const response = await fetch("/api/upload/profile", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = (await response.json()) as { error?: string };
        throw new Error(errorData.error || "Failed to upload image");
      }

      setUploadProgress(100);

      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully.",
      });

      // Clear the selected file
      setSelectedFile(null);

      // Redirect to profile setup main page
      setTimeout(() => {
        // Force a refresh to reload the session data
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description:
          error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Clear the selected image and file
  const handleClearSelection = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setUploadProgress(0);

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Profile Picture</h1>
        <p className="text-muted-foreground mb-8">
          Upload a profile picture to personalize your KhmerCoders account.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Upload Profile Picture</CardTitle>
            <CardDescription>
              Choose an image to represent you on the platform. The image will
              be resized to 512x512 pixels.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col items-center space-y-6">
              {/* Current or Selected Image Preview */}
              <div className="w-40 h-40 relative rounded-full overflow-hidden border-2 border-primary/40">
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="Selected profile picture"
                    fill
                    className="object-cover"
                  />
                ) : userImage ? (
                  <Image
                    src={userImage}
                    alt="Current profile picture"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-muted-foreground opacity-30" />
                  </div>
                )}
              </div>

              {/* Upload Progress */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-full max-w-xs">
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-center">
                    Uploading: {Math.round(uploadProgress)}%
                  </p>
                </div>
              )}

              {/* Upload Complete Indicator */}
              {uploadProgress === 100 && (
                <div className="flex items-center gap-2 text-primary">
                  <Check className="h-5 w-5" />
                  <span>Upload complete!</span>
                </div>
              )}

              {/* File Input */}
              <div className="space-y-2 w-full max-w-xs">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="profile-picture-input"
                  disabled={isUploading}
                />

                <div className="flex gap-2">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full"
                    disabled={isUploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Select Image
                  </Button>

                  {selectedImage && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleClearSelection}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  Supported formats: JPG, PNG, WebP, GIF. Max size: 5MB.
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => router.push("/profile/setup")}
              disabled={isUploading}
            >
              Cancel
            </Button>

            <Button
              onClick={uploadImage}
              disabled={!selectedFile || isUploading}
              className="min-w-[100px]"
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <></>
              )}
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
