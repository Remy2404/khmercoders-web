'use client';
import { Badge } from '@/components/generated/badge';
import { Button } from '@/components/generated/button';
import { reviewProfileByAiAction } from '@/server/actions/users';
import { Bot, Loader } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useProfileAiReview } from './profile-review-provider';

export function ProfileAiAssistance() {
  const { setFeedback } = useProfileAiReview();
  const [loading, setLoading] = useState(false);

  const handleReviewProfile = useCallback(() => {
    console.log('Reviewing profile with AI assistance...');

    setLoading(true);
    reviewProfileByAiAction()
      .then(response => {
        if (response.success && typeof response.data === 'object') {
          setFeedback?.(response.data);
          console.log('AI review feedback:', response.data);
        } else {
          console.error('Failed to get AI review feedback:', response.message);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [setFeedback]);

  return (
    <Button
      className="justify-start"
      variant={'ghost'}
      onClick={handleReviewProfile}
      disabled={loading}
    >
      {loading ? <Loader className="animate-spin" /> : <Bot />}
      Review my profile
      <Badge>AI</Badge>
    </Button>
  );
}
