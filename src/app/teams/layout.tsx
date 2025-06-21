import type React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Teams | Khmer Coders',
  description:
    "Meet the founding members, volunteers, and community moderators of Khmer Coders, Cambodia's largest coding community.",
};

export default function TeamsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
