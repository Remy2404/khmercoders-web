/**
 * Validates if a string is a valid alias.
 *
 * A valid alias must:
 * - Not be empty
 * - Be at least 5 characters long
 * - Start with a letter
 * - Contain only letters, numbers, underscores, hyphens, and periods
 * - End with a letter, number, underscore, or hyphen
 * - Not contain consecutive periods
 *
 * @param alias - The string to validate as an alias
 * @returns True if the alias is valid, false otherwise
 */
export function isValidAlias(alias: string): boolean {
  if (!alias) return false;

  // Check if alias length is at least 5 characters
  if (alias.length < 5) return false;

  const validAliasRegex = /^[a-zA-Z][a-zA-Z0-9_.-]*[a-zA-Z0-9_-]$/;

  const hasConsecutivePeriods = /\.\./.test(alias);

  return validAliasRegex.test(alias) && !hasConsecutivePeriods;
}
