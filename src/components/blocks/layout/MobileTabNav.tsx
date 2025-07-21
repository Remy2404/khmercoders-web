import { HomeIcon, PlusIcon, SearchIcon, SettingsIcon } from 'lucide-react';

export function MobileTabNavigation() {
  const tabButtonClass = 'flex text-center p-3 items-center justify-center focus:outline-none';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
      <nav className="grid grid-cols-4">
        <button className={tabButtonClass}>
          <HomeIcon />
        </button>
        <button className={tabButtonClass}>
          <SearchIcon />
        </button>
        <button className={tabButtonClass}>
          <PlusIcon />
        </button>
        <button className={tabButtonClass}>
          <SettingsIcon />
        </button>
      </nav>
    </div>
  );
}
