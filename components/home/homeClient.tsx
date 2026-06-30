"use client";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroText from "@/components/hero/heroText";
import { Loader } from "@/components/layout/loader/loader";
import Hero2 from "@/components/hero2/hero2";
import Projects from "@/components/projects/projects";
import Reveal from "@/components/marquee/reveal";
import Marquee from "@/components/marquee/marquee1";
import Services from "@/components/services/services";
import ContactUs from "@/components/contactUsCard/contactUs";
import FeaturedProjects from "../projects/featuredProjects";
import ScrollCarousel from "../marquee/rollerMarquee";
import CarouselPage from "../layout/3DCarousel/carousel";
import CardStack from "../layout/cardStack/cardStack";
import RevealSection from "@/components/layout/pageTransition/revealAnimation";
import BottomDesc from "../layout/bottomDesc/bottomDesc";
import MainMarquee from "../marquee/mainMarquee";

export default function HomeClient() {
	const [showLoader, setShowLoader] = useState(true);
	const heroTitleRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (showLoader) return;
		const id = requestAnimationFrame(() => {
			ScrollTrigger.refresh();
		});
		return () => cancelAnimationFrame(id);
	}, [showLoader]);

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

			<RevealSection>
				<Reveal>
					<Marquee text="@Destinations we've shaped" />
				</Reveal>
				<Projects />
			</RevealSection>

			<RevealSection>
				<Reveal>
					<Marquee text="@Wildboys operating system" />
				</Reveal>
				<Services />
			</RevealSection>

			<RevealSection>
				<Reveal>
					<Marquee text="@Where we operate" />
				</Reveal>
				<CarouselPage />
			</RevealSection>

			<RevealSection>
				<Reveal>
					<Marquee text="@Experiences we curate" />
				</Reveal>
				<FeaturedProjects />
			</RevealSection>
			<BottomDesc text1="Original Concepts" text3="Created by wildboys" className="border-b border-zinc-100 dark:border-zinc-900 text-black dark:text-zinc-400" />

			<Reveal>
				<Marquee text="Wildboys Orignals" />
			</Reveal>
			<CardStack />

			<MainMarquee />

			<ScrollCarousel />

			<Reveal>
				<Marquee text="@Contact" />
			</Reveal>
			<ContactUs />
		</main>
	);
}