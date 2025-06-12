"use server";
import { withAuthAction } from "./middleware";
import { eq } from "drizzle-orm";
import * as schema from "@/libs/db/schema";
import { v4 as uuidv4 } from "uuid";

/**
 * Interface for experience data used in create and update actions
 */
interface ExperienceData {
  startYear: number;
  endYear?: number | null;
  companyName: string;
  companyLogo?: string;
  role: string;
  description?: string;
}

/**
 * Server action to create a new work experience for the authenticated user
 */
export const createExperienceAction = withAuthAction(
  async ({ db, user }, data: ExperienceData) => {
    // Validate input data
    if (!isValidExperienceData(data)) {
      return {
        success: false,
        message: "Invalid experience data. Please check your inputs.",
      };
    }

    const now = new Date();

    try {
      // Generate a new UUID for the experience
      const id = uuidv4();

      await db.insert(schema.workExperience).values({
        id,
        userId: user.id,
        startYear: data.startYear,
        endYear: data.endYear || null,
        companyName: data.companyName.trim(),
        companyLogo: data.companyLogo?.trim(),
        role: data.role.trim(),
        description: data.description?.trim(),
        createdAt: now,
        updatedAt: now,
      });

      return {
        success: true,
        message: "Experience added successfully.",
        experienceId: id,
      };
    } catch (error) {
      console.error("Failed to create experience:", error);
      return {
        success: false,
        message: "Failed to add experience. Please try again later.",
      };
    }
  }
);

/**
 * Server action to update an existing work experience
 */
export const updateExperienceAction = withAuthAction(
  async ({ db, user }, experienceId: string, data: ExperienceData) => {
    // Validate input data
    if (!isValidExperienceData(data)) {
      return {
        success: false,
        message: "Invalid experience data. Please check your inputs.",
      };
    }

    // Check if the experience exists and belongs to the user
    const experience = await db.query.workExperience.findFirst({
      where: (workExp) =>
        eq(workExp.id, experienceId) && eq(workExp.userId, user.id),
    });

    if (!experience) {
      return {
        success: false,
        message:
          "Experience not found or you don't have permission to edit it.",
      };
    }

    const now = new Date();

    try {
      await db
        .update(schema.workExperience)
        .set({
          startYear: data.startYear,
          endYear: data.endYear || null,
          companyName: data.companyName.trim(),
          companyLogo: data.companyLogo?.trim(),
          role: data.role.trim(),
          description: data.description?.trim(),
          updatedAt: now,
        })
        .where(eq(schema.workExperience.id, experienceId));

      return {
        success: true,
        message: "Experience updated successfully.",
      };
    } catch (error) {
      console.error("Failed to update experience:", error);
      return {
        success: false,
        message: "Failed to update experience. Please try again later.",
      };
    }
  }
);

/**
 * Server action to remove an existing work experience
 */
export const removeExperienceAction = withAuthAction(
  async ({ db, user }, experienceId: string) => {
    // Check if the experience exists and belongs to the user
    const experience = await db.query.workExperience.findFirst({
      where: (workExp) =>
        eq(workExp.id, experienceId) && eq(workExp.userId, user.id),
    });

    if (!experience) {
      return {
        success: false,
        message:
          "Experience not found or you don't have permission to remove it.",
      };
    }

    try {
      await db
        .delete(schema.workExperience)
        .where(eq(schema.workExperience.id, experienceId));

      return {
        success: true,
        message: "Experience removed successfully.",
      };
    } catch (error) {
      console.error("Failed to remove experience:", error);
      return {
        success: false,
        message: "Failed to remove experience. Please try again later.",
      };
    }
  }
);

/**
 * Server action to get all work experiences for the authenticated user
 */
export const getUserExperiencesAction = withAuthAction(async ({ db, user }) => {
  try {
    const experiences = await db.query.workExperience.findMany({
      where: eq(schema.workExperience.userId, user.id),
      orderBy: (workExp, { desc }) => [
        desc(workExp.endYear),
        desc(workExp.startYear),
      ],
    });

    return {
      success: true,
      experiences,
    };
  } catch (error) {
    console.error("Failed to fetch experiences:", error);
    return {
      success: false,
      message: "Failed to fetch experiences. Please try again later.",
      experiences: [],
    };
  }
});

/**
 * Helper function to validate experience data
 */
function isValidExperienceData(data: ExperienceData): boolean {
  // Check required fields
  if (!data.companyName || data.companyName.trim().length === 0) {
    return false;
  }

  if (!data.role || data.role.trim().length === 0) {
    return false;
  }

  // Validate startYear
  const currentYear = new Date().getFullYear();
  if (
    !data.startYear ||
    data.startYear < 1900 ||
    data.startYear > currentYear
  ) {
    return false;
  }

  // Validate endYear if provided
  if (data.endYear !== undefined && data.endYear !== null) {
    if (data.endYear < data.startYear || data.endYear > currentYear) {
      return false;
    }
  }

  // Validate description length if provided
  if (data.description && data.description.length > 1000) {
    return false;
  }

  return true;
}
