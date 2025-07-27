'use server';
import { withOptionalAuthAction } from './middleware';
import { FeedFilterOptions, getFeed } from '../services/feed';

export const getFeedAction = withOptionalAuthAction(
  async ({ user }, options: FeedFilterOptions) => {
    return getFeed(options, user?.id);
  }
);
