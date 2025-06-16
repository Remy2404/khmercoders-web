import { HomeHeroBanner } from "./hero";
import { HomeEventSection } from "./events";
import { HomeFoundingSection } from "./founding";

export const revalidate = 3600; // Cache the page for 3600 seconds (1 hour)

export default async function LandingPage() {
  return (
    <main className="relative">
      <HomeHeroBanner />
      <HomeFoundingSection />
      <HomeEventSection />

      <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-20 px-4 justify-center items-center">
        <img
          src="/assets/images/kol-program-md.png"
          className="border-gray-800 border-b-8 w-full"
        />
        <div>
          <div className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm text-amber-500 mb-4">
            <span className="font-medium">Creator Program</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Empowering{" "}
            <span className="text-yellow-500">Technical Creators</span>
          </h2>
          <p className="text-gray-400 mb-6">
            Our creator program supports technical content creators who share
            knowledge, provide entertainment, and inspire the next generation to
            pursue careers in STEM.
          </p>
          <p className="text-gray-400 mb-8">
            We provide resources, mentorship, and a platform for creators to
            reach wider audiences, while building a community of passionate
            educators who make technical concepts accessible and engaging for
            everyone.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-yellow-500/20 backdrop-blur-lg rounded-xl p-4 border border-yellow-500/80 shadow-lg">
              <div className="text-2xl font-bold">10,000+</div>
              <div className="text-sm">Subscribers</div>
            </div>

            <div className="bg-yellow-500/20 backdrop-blur-lg rounded-xl p-4 border border-yellow-500/80 shadow-lg">
              <div className="text-2xl font-bold">1,000,000+</div>
              <div className="text-sm">Views</div>
            </div>

            <div className="bg-yellow-500/20 backdrop-blur-lg rounded-xl p-4 border border-yellow-500/80 shadow-lg">
              <div className="text-2xl font-bold">200,000+</div>
              <div className="text-sm">Engagement</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
