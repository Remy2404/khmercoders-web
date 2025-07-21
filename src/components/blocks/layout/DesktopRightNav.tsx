import { GithubIcon } from '@/components/atoms/icons';

export function DesktopRightNavigation() {
  return (
    <div className="hidden lg:block lg:w-[280px] shrink-0 p-4">
      <div className="sticky top-4 flex flex-col gap-4">
        <img src="/logo.svg" alt="Khmer Coders Logo" className="w-16 h-16 h-auto mb-4" />

        <p className="text-sm">
          <strong>Khmer Coders</strong>
          {` has grown to become Cambodia's largest coding community. We bring together
          developers, designers, and tech enthusiasts to learn, share, and grow together.`}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-sm flex flex-col">
            <h3 className="font-bold mb-1">Website</h3>
            <span className="text-lg font-bold">455</span>
            <span className="text-muted-foreground -mt-2">members</span>
          </div>

          <div className="text-sm flex flex-col">
            <h3 className="font-bold mb-1">Telegram Group</h3>
            <span className="text-lg font-bold">1,531</span>
            <span className="text-muted-foreground -mt-2">members</span>
          </div>

          <div className="text-sm flex flex-col">
            <h3 className="font-bold mb-1">Facebook Group</h3>
            <span className="text-lg font-bold">12,754</span>
            <span className="text-muted-foreground -mt-2">members</span>
          </div>

          <div className="text-sm flex flex-col">
            <h3 className="font-bold mb-1">Discord Group</h3>
            <span className="text-lg font-bold">1,500</span>
            <span className="text-muted-foreground -mt-2">members</span>
          </div>
        </div>

        <hr />

        <p className="text-sm">
          Our platform is open source. If you'd like to help us improve it, please submit a pull
          request or contribute directly to{' '}
          <a
            href="https://github.com/KhmerCoders/khmercoders-web"
            className="text-blue-600 hover:underline"
            target="_blank"
          >
            {' '}
            our repository on GitHub.
          </a>
        </p>

        <GithubIcon className="text-muted-foreground w-8 h-8" />
      </div>
    </div>
  );
}
