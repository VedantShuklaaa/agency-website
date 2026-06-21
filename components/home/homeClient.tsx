"use client";
import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

import HeroText from "@/components/hero/heroText";
import { Loader } from "@/components/layout/loader/loader";
import Hero2 from "@/components/hero2/hero2";
import Projects from "@/components/projects/projects";
import Reveal from "@/components/marquee/reveal";
import Marquee from "@/components/marquee/marquee1";
import Services from "@/components/services/services";
import ContactUs from "@/components/contactUsCard/contactUs";

const FeaturedProjects = dynamic(() => import("@/components/projects/featuredProjects"));
const CarouselPage = dynamic(() => import("@/components/layout/3DCarousel/carousel"));
const ScrollCarousel = dynamic(() => import("@/components/marquee/rollerMarquee"));

export default function HomeClient() {
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