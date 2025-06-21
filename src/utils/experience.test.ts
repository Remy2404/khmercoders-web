import { expect, test } from 'vitest';
import { sortExperience } from './experience';
import { ExperienceRecord } from '@/types';

test('ordering working experience with present', () => {
  const exp = sortExperience([
    e('Company A', 2020, 2022),
    e('Company B', 2019, null), // Present
    e('Company C', 2021, 2023),
    e('Company D', 2018, null), // Present
    e('Company E', 2022, null), // Present
  ]);

  expect(exp[0].companyName).toEqual('Company E'); // Most recent present experience
  expect(exp[1].companyName).toEqual('Company B'); // Second most recent present experience
  expect(exp[2].companyName).toEqual('Company D'); // Most recent past experience
  expect(exp[3].companyName).toEqual('Company C'); // Second most recent past experience
  expect(exp[4].companyName).toEqual('Company A'); // Oldest present experience
});

test('ordering working experience with all past', () => {
  const exp = sortExperience([
    e('Company A', 2020, 2022),
    e('Company B', 2019, 2021),
    e('Company C', 2021, 2023),
    e('Company D', 2018, 2020),
    e('Company E', 2022, 2023),
  ]);

  expect(exp[0].companyName).toEqual('Company E'); // Most recent past experience
  expect(exp[1].companyName).toEqual('Company C'); // Second most recent past experience
  expect(exp[2].companyName).toEqual('Company A'); // Third most recent past experience
  expect(exp[3].companyName).toEqual('Company B'); // Fourth most recent past experience
  expect(exp[4].companyName).toEqual('Company D'); // Oldest past experience
});

/**
 * Helper function to create an experience record.
 * This is used to generate test data for the sorting function.
 */
function e(companyName: string, startYear: number, endYear: number | null): ExperienceRecord {
  return {
    id: companyName,
    companyName,
    startYear,
    endYear,
    updatedAt: new Date(),
    createdAt: new Date(),
    role: '',
    description: '',
    companyId: null,
    userId: '',
    companyLogo: '',
  };
}
