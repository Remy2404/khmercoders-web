'use client';

import { type ProfileAiReviewFeedback } from '@/types';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const ProfileAiReviewContext = createContext<{
  feedback?: ProfileAiReviewFeedback;
  setFeedback?: (value: ProfileAiReviewFeedback) => void;
}>({});

export function useProfileAiReview() {
  return useContext(ProfileAiReviewContext);
}

export function ProfileAiReviewProvider({ children }: PropsWithChildren) {
  const [feedback, setFeedback] = useState<ProfileAiReviewFeedback | undefined>(undefined);

  return (
    <ProfileAiReviewContext.Provider value={{ feedback, setFeedback }}>
      {children}
    </ProfileAiReviewContext.Provider>
  );
}
