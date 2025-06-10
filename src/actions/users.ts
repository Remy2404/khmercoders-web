"use server";
import { withAuthAction } from "./middleware";
import { isValidAlias } from "@/utils/validate";
import * as schema from "@/libs/db/schema";

export const updateUserAliasAction = withAuthAction(
  async ({ db, user, profile }, alias: string) => {
    // Validate alias
    if (!isValidAlias(alias)) {
      return {
        success: false,
        message:
          "Invalid alias format. Please use alphanumeric characters, underscores, or hyphens.",
      };
    }

    // Update user alias
    const normalizedAlias = alias.toLowerCase();
    const now = new Date();

    if (profile && profile.alias === normalizedAlias) {
      // If the alias is already set and matches, no need to update
      return { success: false };
    }

    // Check if the alias is already updated in the last 7 days, it will fail
    if (
      profile &&
      profile.aliasUpdatedAt &&
      new Date(profile.aliasUpdatedAt).getTime() >
        now.getTime() - 7 * 24 * 60 * 60 * 1000
    ) {
      return {
        success: false,
        message:
          "You can only update your alias once every 7 days. Please try again later.",
      };
    }

    try {
      await db
        .insert(schema.memberProfile)
        .values({
          userId: user.id,
          alias: normalizedAlias,
          createdAt: now,
          updatedAt: now,
          aliasUpdatedAt: now,
        })
        .onConflictDoUpdate({
          target: schema.memberProfile.userId,
          set: {
            alias: normalizedAlias,
            aliasUpdatedAt: now,
            updatedAt: now,
          },
        });
    } catch (error) {
      // Check if the error is due to a unique constraint violation (alias already taken)
      if (
        error instanceof Error &&
        error.message.includes("unique constraint")
      ) {
        return {
          success: false,
          message: "This alias is already taken. Please choose another one.",
        };
      }

      return {
        success: false,
        message: "Failed to update alias. Please try again later.",
      };
    }

    return {
      success: true,
      message: "Alias updated successfully.",
      alias: normalizedAlias,
    };
  }
);
