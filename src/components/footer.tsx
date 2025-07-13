import { DiscordIcon } from '@/components/atoms/icons';
import { KCLinks } from '@/data/link';
import { Facebook, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';

export function Footer() {
  return (
    <footer className="border-t py-12 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Logo and social links section */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex flex-col items-start sm:flex-row sm:items-center gap-2 mb-4"
            >
              <Image
                src="/khmer-coder.svg"
                alt="Khmer Coders"
                width={48}
                height={48}
                className="object-contain"
              />
              <span className="text-orange-400 font-mono tracking-tight font-semibold">
                KhmerCoders
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 text-base">
              Cambodia&apos;s largest community of developers and tech enthusiasts.
            </p>
          </div>

          {/* Navigation links section */}
          <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4 text-base">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/events" className="text-muted-foreground hover:text-foreground">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/teams" className="text-muted-foreground hover:text-foreground">
                    Our Teams
                  </Link>
                </li>
                <li>
                  <Link href="/members" className="text-muted-foreground hover:text-foreground">
                    Our Members
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-base">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/partners" className="text-muted-foreground hover:text-foreground">
                    Our Partners
                  </Link>
                </li>
                <li>
                  <Link href="/donate" className="text-muted-foreground hover:text-foreground">
                    Support Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-base">Join Us</h3>
              <div className="flex gap-4">
                <Link
                  href={KCLinks.facebookGroupLink}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join Facebook Group"
                >
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link
                  href={KCLinks.discordLink}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join Discord"
                >
                  <DiscordIcon className="h-6 w-6" />
                </Link>
                <Link
                  href={KCLinks.githubLink}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit GitHub"
                >
                  <Github className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Khmer Coders. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
