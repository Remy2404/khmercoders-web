'use client';
import { DesktopLeftNavigation } from '@/components/blocks/layout/DesktopLeftNav';
import { PropsWithChildren } from 'react';
import { DesktopRightNavigation } from './DesktopRightNav';
import { MobileTabNavigation } from './MobileTabNav';

export function MainLayout({
  children,
  hideRightNav,
}: PropsWithChildren<{ hideRightNav?: boolean }>) {
  return (
    <div className="mx-auto max-w-[1200px] flex min-h-screen">
      <DesktopLeftNavigation />
      <div className="border-x grow overflow-hidden">
        <div className="pb-20 md:pb-0">{children}</div>
      </div>
      {!hideRightNav && <DesktopRightNavigation />}
      <MobileTabNavigation />
    </div>
  );
}
