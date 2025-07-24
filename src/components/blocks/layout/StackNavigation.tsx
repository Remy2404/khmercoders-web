import { ChevronLeft, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
  defaultBackURL?: string;
  icon?: LucideIcon;
}

export function StackNavigation({ title, defaultBackURL, icon: IconComponent }: HeaderProps) {
  return (
    <nav className="p-4 border-b flex gap-2 sticky top-0 z-10 bg-background">
      {defaultBackURL && (
        <Link href={defaultBackURL} className="text-blue-600 hover:underline flex">
          <ChevronLeft /> Back
        </Link>
      )}
      {IconComponent && <IconComponent />}
      {title && <span className="font-semibold">{title}</span>}
    </nav>
  );
}
