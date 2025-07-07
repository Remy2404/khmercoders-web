'use client';

import { ExperienceRecord } from '@/types';
import { useProfileAiReview } from './profile-review-provider';
import { Bot } from 'lucide-react';

export function ProfileExperienceListWithReview({
  experiences,
}: {
  experiences: ExperienceRecord[];
}) {
  const { feedback } = useProfileAiReview();

  return (
    <>
      {feedback && (
        <div className="bg-card border text-sm my-4 p-4 rounded flex-col gap-2 flex">
          <h2 className="font-semibold text-blue-800 dark:text-blue-400 flex items-center gap-2">
            <Bot />
            AI Review Summary ({feedback.rating}/10)
          </h2>

          <div className="max-w-[200px] h-4 bg-muted rounded overflow-hidden">
            <div
              className="h-full bg-gray-400"
              style={{ width: `${(feedback.rating / 10) * 100}%` }}
            ></div>
          </div>

          <p>{feedback.feedback}</p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {experiences.map((exp, index) => {
          const aiFeedback = feedback?.experiences.find(experience => experience.id === exp.id);

          return (
            <div key={index} className="flex gap-2">
              <div className="bg-card border h-12 w-12 rounded shrink-0 flex items-center justify-center text-orange-400 font-bold">
                {exp.companyName
                  .split(' ')
                  .slice(0, 2)
                  .map(word => word.charAt(0).toUpperCase())
                  .join('')}
              </div>
              <div>
                <h3 className="text-sm font-semibold">{exp.role}</h3>{' '}
                <p className="text-sm text-muted-foreground">
                  <span className="text-orange-400">{exp.companyName}</span> ({exp.startYear} -{' '}
                  {exp.endYear ? exp.endYear : 'Present'})
                </p>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {exp.description}
                </p>
                {aiFeedback && (
                  <div className="bg-card border p-2 text-sm my-2 rounded rounded flex flex-col gap-1">
                    <h2 className="font-semibold text-blue-800 dark:text-blue-400 flex items-center gap-2">
                      <Bot />
                      AI Feedback
                    </h2>
                    <p>{aiFeedback.feedback}</p>
                    {aiFeedback.suggestion && (
                      <>
                        <strong>Suggestion</strong>
                        <p>{aiFeedback.suggestion}</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
