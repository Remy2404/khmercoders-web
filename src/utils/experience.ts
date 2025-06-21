import type { ExperienceRecord } from '@/types';

/**
 * Sorting experience record by end date in descending order.
 * If end date is NULL, it means it is present, so it should be sorted to the top.
 * Using start date as tie-breaker in descending order.
 *
 * @param experiences
 * @returns
 */
export function sortExperience(experiences: ExperienceRecord[]): ExperienceRecord[] {
  return experiences.sort((a, b) => {
    // Handle cases where end date is NULL
    const endA = a.endYear || 9999;
    const endB = b.endYear || 9999;

    // Compare end dates first
    if (endA < endB) return 1; // b comes before a
    if (endA > endB) return -1; // a comes before b

    return b.startYear - a.startYear; // Sort by start date in descending order
  });
}
