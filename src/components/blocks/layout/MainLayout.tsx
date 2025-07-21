'use client';
import { DesktopLeftNavigation } from '@/components/blocks/layout/DesktopLeftNav';
import { PropsWithChildren } from 'react';
import { DesktopRightNavigation } from './DesktopRightNav';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto max-w-[1200px] flex min-h-screen">
      <DesktopLeftNavigation />
      <div className="border-x grow">{children}</div>
      <DesktopRightNavigation />
    </div>
  );
}
