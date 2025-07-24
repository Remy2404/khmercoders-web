import { MainLayout } from '@/components/blocks/layout/MainLayout';

export default function MobileSearchPage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-full max-w-md">
          <div className="relative mb-8">
            <input
              type="search"
              className="w-full py-3 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search..."
              disabled
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon!</h2>
            <p className="text-gray-600">
              We're working hard to bring you a great search experience on mobile. This feature will
              be available soon.
            </p>
            <div className="mt-4 flex justify-center">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Under Development
              </span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
