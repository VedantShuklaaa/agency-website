"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeroText from "@/components/hero/heroText";
import { Loader } from "@/components/layout/loader/loader";
import Hero2 from "@/components/hero2/hero2";
import CarouselPage from "@/components/layout/3DCarousel/carousel";
import Reveal from "@/components/marquee/reveal";
import Projects from "@/components/projects/projects";
import FeaturedProjects from "@/components/projects/featuredProjects";
import Marquee from "@/components/marquee/marquee1";
import ScrollCarousel from "@/components/marquee/rollerMarquee";
import ContactUs from "@/components/contactUsCard/contactUs";
import Services from "@/components/services/services";

export default function HomePage() {
  const [showLoader, setShowLoader] = useState(true);
  const heroTitleRef = useRef<HTMLElement | null>(null);

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        {showLoader && (
          <Loader
            key="page-loader"
            targetRef={heroTitleRef}
            onComplete={() => setShowLoader(false)}
          />
        )}
      </AnimatePresence>

      <HeroText heroTitleRef={heroTitleRef} />
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
        <Marquee text="@Venues" />
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