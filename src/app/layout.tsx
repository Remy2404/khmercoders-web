import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import { Code, Github, Twitter } from "lucide-react";
import { Button } from "@/components/generated/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Khmer Coders - Cambodia's Largest Coding Community",
  description:
    "Join Cambodia's largest community of developers, designers, and tech enthusiasts.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-black text-white">
            <header className="container mx-auto py-6 px-4 flex items-center gap-12 mb-12">
              <Link href="/" className="flex items-center gap-2">
                <Code className="h-8 w-8 text-yellow-500" />
                <span className="text-xl font-bold">Khmer Coders</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/events"
                  className="text-sm hover:text-yellow-500 transition-colors"
                >
                  Events
                </Link>
                <Link
                  href="/teams"
                  className="text-sm hover:text-yellow-500 transition-colors"
                >
                  Teams
                </Link>
                {/* <Link
                  href="/members"
                  className="text-sm hover:text-yellow-500 transition-colors"
                >
                  Members
                </Link> */}
                <Link
                  href="/partners"
                  className="text-sm hover:text-yellow-500 transition-colors"
                >
                  Partners
                </Link>
                <Link
                  href="/donate"
                  className="text-sm hover:text-yellow-500 transition-colors"
                >
                  Donate
                </Link>
              </nav>
            </header>
            {children}
            <footer className="bg-black border-t border-gray-800 py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Code className="h-6 w-6 text-yellow-500" />
                      <span className="text-lg font-bold">Khmer Coders</span>
                    </div>
                    <p className="text-gray-400 mb-4">
                      Cambodia&apos;s largest community of developers and tech
                      enthusiasts.
                    </p>
                    <div className="flex gap-4">
                      <Link href="#" className="text-gray-400 hover:text-white">
                        <Github className="h-5 w-5" />
                      </Link>
                      <Link href="#" className="text-gray-400 hover:text-white">
                        <Twitter className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-4">Community</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/teams"
                          className="text-gray-400 hover:text-white"
                        >
                          Our Teams
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/members"
                          className="text-gray-400 hover:text-white"
                        >
                          Community Members
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/events"
                          className="text-gray-400 hover:text-white"
                        >
                          Events
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white"
                        >
                          Join Discord
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white"
                        >
                          Facebook Group
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold mb-4">Resources</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/partners"
                          className="text-gray-400 hover:text-white"
                        >
                          Our Partners
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/donate"
                          className="text-gray-400 hover:text-white"
                        >
                          Support Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white"
                        >
                          Learning Materials
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white"
                        >
                          Job Board
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold mb-4">Contact</h3>
                    <ul className="space-y-2">
                      <li className="text-gray-400">Phnom Penh, Cambodia</li>
                      <li>
                        <Link
                          href="mailto:info@khmercoders.org"
                          className="text-gray-400 hover:text-white"
                        >
                          info@khmercoders.org
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white"
                        >
                          Partner With Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white"
                        >
                          Sponsor an Event
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                  <p>
                    &copy; {new Date().getFullYear()} Khmer Coders. All rights
                    reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
