import { MainLayout } from '@/components/blocks/layout/MainLayout';

export default function MobilePostPage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 mt-8">
        <div className="w-full max-w-md">
          <div className="relative mb-8">
            <div className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-gray-50 min-h-[120px] flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="h-12 w-12 text-gray-400 mx-auto mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <p className="text-gray-500 text-sm">Create new post</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button
                className="flex-1 py-2 px-4 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed"
                disabled
              >
                📝 Text Post
              </button>
              <button
                className="flex-1 py-2 px-4 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed"
                disabled
              >
                📷 Image Post
              </button>
            </div>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon!</h2>
            <p className="text-gray-600">
              {`We're working hard to bring you a seamless posting experience on mobile. Create and share your content with the community soon.`}
            </p>
            <div className="mt-4 flex justify-center">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Under Development
              </span>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">Features coming soon:</p>
              <ul className="space-y-1">
                <li>✨ Rich text formatting</li>
                <li>📸 Image and video uploads</li>
                <li>🏷️ Tags and categories</li>
                <li>📱 Mobile-optimized editor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
