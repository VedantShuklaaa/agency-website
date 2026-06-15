"use client";
import HeroText from "@/components/hero/heroText";
import Hero2 from "@/components/hero2/hero2";
import CarouselPage from "@/components/layout/3DCarousel/carousel";
import FeaturedWorkMarquee from "@/components/marquee/marquee1";
import Reveal from "@/components/marquee/reveal";
import Projects from "@/components/projects/projects";
import FeaturedProjects from "@/components/projects/featuredProjects";
import Marquee from "@/components/marquee/marquee1";
import ScrollCarousel from "@/components/marquee/rollerMarquee";
import ContactUs from "@/components/contactUsCard/contactUs";
import Services from "@/components/services/services";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-[background] scroll-smooth">
      <HeroText />
      <Hero2 />

      <Reveal>
        <Marquee text="featured works©" />
      </Reveal>
      <Projects />

      <Reveal>
        <Marquee text="Experiences©" />
      </Reveal>
      <FeaturedProjects />

      <Reveal>
        <FeaturedWorkMarquee text="@Venues" />
      </Reveal>
      <CarouselPage />

      <Reveal>
        <Marquee text="©Services" />
      </Reveal>
      <Services />

      <ScrollCarousel />

      <ContactUs />
    </main>
  );
}

