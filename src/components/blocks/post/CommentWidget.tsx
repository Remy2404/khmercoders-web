'use client';
import { useSession } from '@/components/auth-provider';
import { PostEditor } from './PostEditor';

export function CommentWidget() {
  const { session } = useSession();

  return <div>{session?.user && <PostEditor />}</div>;
}
