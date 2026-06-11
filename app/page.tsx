import HeroText from "@/components/hero/heroText/heroText";
import Hero2 from "@/components/hero2/hero2";
import FeaturedWorkMarquee from "@/components/marquee/marquee1";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-[background] scroll-smooth">
      <HeroText />
      <Hero2 />
      <FeaturedWorkMarquee />
    </main>
  );
}


