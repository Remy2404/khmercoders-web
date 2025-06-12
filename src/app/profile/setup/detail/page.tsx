"use client";

import { Button } from "@/components/generated/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/generated/card";
import { Input } from "@/components/generated/input";
import { Textarea } from "@/components/generated/textarea";
import { useSession } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState, useCallback } from "react";
import { updateUserProfileAction } from "@/actions/users";

export default function ProfileSetupDetailPage() {
  const { session, profile } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state using useState hooks
  const [name, setName] = useState(session?.user.name || "");
  const [title, setTitle] = useState(profile?.title || "");
  const [bio, setBio] = useState(profile?.bio || "");

  // Validation errors
  const [errors, setErrors] = useState({
    name: "",
    title: "",
    bio: "",
  });

  // Validate form data using useCallback
  const validateForm = useCallback(() => {
    let valid = true;
    const newErrors = {
      name: "",
      title: "",
      bio: "",
    };

    // Validate name
    if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      valid = false;
    } else if (name.trim().length > 50) {
      newErrors.name = "Name must be less than 50 characters";
      valid = false;
    }

    // Validate title
    if (title && title.trim().length > 100) {
      newErrors.title = "Title must be less than 100 characters";
      valid = false;
    }

    // Validate bio
    if (bio && bio.trim().length > 500) {
      newErrors.bio = "Bio must be less than 500 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }, [name, title, bio]); // Dependencies - recompute when these values change

  const handleSubmit = useCallback(async () => {
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await updateUserProfileAction({
        name: name.trim(),
        title: title.trim(),
        bio: bio.trim(),
      });

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });

        // Redirect to the user's profile page using their alias
        if (profile?.alias) {
          router.push(`/@${profile.alias}`);
        } else {
          router.push("/profile");
        }
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, name, title, bio, profile, router, toast]); // Dependencies for handleSubmit

  if (!session) {
    return null; // or some loading state, or redirect to login
  }

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Tell us more about yourself. This information will be displayed on
            your public profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
            <p className="text-sm text-muted-foreground">
              This is your public display name.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Professional Title
            </label>
            <Input
              id="title"
              placeholder="e.g. Full Stack Developer at Company"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Your professional title or current position.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium">
              Bio
            </label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself, your skills, experiences, and interests..."
              className="min-h-[120px]"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            {errors.bio && <p className="text-sm text-red-500">{errors.bio}</p>}
            <p className="text-sm text-muted-foreground">
              A brief introduction about yourself. This will be displayed on
              your profile.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="button" disabled={isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? "Saving..." : "Save Profile"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
