'use client';

import { Button, ButtonProps } from '@/components/generated/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ModeToggle({ variant = 'outline' }: { variant?: ButtonProps['variant'] }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant={variant}
      className="w-full justify-start gap-3 px-2 rounded-lg my-2 transition-all duration-300 -ml-2"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {/* Toggle Switch Container */}
      <div className="relative flex items-center w-12 h-6 rounded-full bg-gradient-to-r from-orange-200 to-orange-300 dark:from-blue-800 dark:to-purple-800 transition-all duration-700 shadow-inner">
        {/* Sliding Toggle Circle */}
        <div className="absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-700 ease-in-out translate-x-0.5 dark:translate-x-6">
          {/* Icons inside the sliding circle */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Sun className="absolute w-3 h-3 text-orange-500 scale-100 rotate-0 transition-all duration-500 dark:scale-0 dark:rotate-90" />
            <Moon className="absolute w-3 h-3 text-blue-600 scale-0 rotate-90 transition-all duration-500 dark:scale-100 dark:rotate-0" />
          </div>
        </div>
      </div>

      <span className="dark:hidden transition-opacity duration-500">Switch to Dark</span>
      <span className="hidden dark:inline transition-opacity duration-500">Switch to Light</span>
    </Button>
  );
}
