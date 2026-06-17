"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Marquee from "./marquee1";
import BottomDesc from "../layout/bottomDesc/bottomDesc";

gsap.registerPlugin(ScrollTrigger);

const CARDS = ["POCO", "Pure Project", "Groww", "cult.", "prime video", "xiaomi", "POCO", "cult."];

export default function ScrollCarousel() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const track = trackRef.current;
		const section = sectionRef.current;
		if (!track || !section) return;

		const scrollDistance =
			track.scrollWidth - section.clientWidth - 64;

		gsap.to(track, {
			x: -scrollDistance,
			ease: "none",
			scrollTrigger: {
				trigger: section,
				start: "top top",
				end: `+=${scrollDistance}`,
				scrub: 1,
				pin: true,
				anticipatePin: 1,
			},
		});
	}, { scope: sectionRef, dependencies: [] });

	return (
		<section
			ref={sectionRef}
			className="relative overflow-hidden flex flex-col font-twid border-b border-black dark:border-zinc-600 hidden md:flex"
		>
			{/* Marquee */}
			<div className="flex w-full border-b border-black dark:border-zinc-600">
				<Marquee text="clients©" />
			</div>

			{/* Carousel */}
			<div className="flex items-center">
				<div
					ref={trackRef}
					className="flex gap-4 md:gap-6 lg:gap-8 px-4 md:px-6 lg:px-8 py-4"
				>
					{CARDS.map((src, i) => (
						<div
							key={i}
							className="carousel-card h-[250px] w-[80vw] md:h-[350px] md:w-[60vw] lg:h-[40vh] lg:w-[30vw] flex-shrink-0 overflow-hidden rounded-sm border border-zinc-700 flex items-center justify-center text-2xl md:text-4xl lg:text-5xl"
						>
							{src}
						</div>
					))}
				</div>
			</div>

			<BottomDesc text1="© Get in touch" text2="(CAD® — 09)" text3="Studio Wrap" className="text-black dark:text-zinc-400" />
		</section>
	);
}