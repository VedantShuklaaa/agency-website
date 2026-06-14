"use client";
import HeroText from "@/components/hero/heroText";
import Hero2 from "@/components/hero2/hero2";
import CarouselPage from "@/components/layout/3DCarousel/carousel";
import FeaturedWorkMarquee from "@/components/marquee/marquee1";
import Reveal from "@/components/marquee/reveal";
import Projects from "@/components/projects/projects";
import FeaturedProjects from "@/components/projects/faturedProjects";
import Marquee from "@/components/marquee/marquee1";
import ScrollCarousel from "@/components/marquee/rollerMarquee";
import ContactUs from "@/components/contactUsCard/contactUs";




export default function HomePage() {
  return (
    <main className="min-h-screen bg-[background] scroll-smooth">
      <HeroText />
      <Hero2 />
      <FeaturedWorkMarquee text="featured works©" />
      <Projects />
      <FeaturedProjects />

      <Reveal>
        <FeaturedWorkMarquee text="@Venues" />
      </Reveal>

      <CarouselPage />

      <ScrollCarousel />

      <ContactUs />
    </main>
  );
}


