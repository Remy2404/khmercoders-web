import type React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Partners | Khmer Coders',
  description:
    "Meet the organizations and companies that support Khmer Coders in building Cambodia's tech ecosystem.",
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
