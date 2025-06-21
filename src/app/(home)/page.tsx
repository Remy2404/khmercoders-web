import { HomeHeroBanner } from './hero';
import { HomeEventSection } from './events';
import { HomeFoundingSection } from './founding';
import { Users, Eye, MessageCircle } from 'lucide-react';

export const revalidate = 3600; // Cache the page for 3600 seconds (1 hour)

export default async function LandingPage() {
  return (
    <main className="relative">
      <HomeHeroBanner />
      <HomeFoundingSection />
      <HomeEventSection />

      <section className="container mx-auto font-retro grid grid-cols-1 lg:grid-cols-2 gap-8 py-20 px-4 justify-center items-center">
        <img
          alt=""
          src="/assets/images/kol-program-md.png"
          className="border-gray-800 border-b-8 w-full"
        />
        <div>
          <div className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm text-amber-500 mb-4">
            <span className="font-medium">Creator Program</span>
          </div>
          <h2 className="font-retro text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Empowering <span className="text-yellow-500">Technical Creators</span>
          </h2>
          <p className="font-mono mb-6">
            Our creator program supports technical content creators who share knowledge, provide
            entertainment, and inspire the next generation to pursue careers in STEM.
          </p>
          <p className="font-mono mb-8">
            We provide resources, mentorship, and a platform for creators to reach wider audiences,
            while building a community of passionate educators who make technical concepts
            accessible and engaging for everyone.
          </p>

          <div className="font-mono grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border border-4 border-gray-400 border-double p-4 w-[180px] h-[120px] flex flex-col items-center justify-center text-center shadow-lg">
              <Users className="h-24 w-24 text-yellow-500 mb-2" />
              <div className="text-xl xl:text-2xl font-bold">10,000+</div>
              <div className="text-sm">Subscribers</div>
            </div>
            <div className="border border-4 border-gray-400 border-double p-4 w-[180px] h-[120px] flex flex-col items-center justify-center text-center shadow-lg">
              <Eye className="h-24 w-24 text-yellow-500 mb-2" />
              <div className="text-xl xl:text-2xl font-bold">1,000,000+</div>
              <div className="text-sm">Views</div>
            </div>
            <div className="border border-4 border-gray-400 border-double p-4 w-[180px] h-[120px] flex flex-col items-center justify-center text-center shadow-lg">
              <MessageCircle className="h-24 w-24 text-yellow-500 mb-2" />
              <div className="text-xl xl:text-2xl font-bold">200,000+</div>
              <div className="text-sm">Engagement</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
