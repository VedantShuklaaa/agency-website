"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
	"/images/1.jpg",
	"/images/2.jpg",
	"/images/3.jpg",
	"/images/4.jpg",
	"/images/5.jpg",
];

const CARD_WIDTH_VW = 0.6;
const GAP = 32; 

export default function ScrollCarousel() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const track = trackRef.current;
		const section = sectionRef.current;
		if (!track || !section) return;

		const cardWidth = window.innerWidth * CARD_WIDTH_VW;
		const totalWidth = CARDS.length * cardWidth + (CARDS.length - 1) * GAP;
		const scrollDistance = totalWidth - window.innerWidth;

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
		<section ref={sectionRef} className="relative h-screen overflow-hidden flex flex-col">
			<div className="flex h-full items-center">
				<div ref={trackRef} className="flex gap-8">
					{CARDS.map((src, i) => (
						<div
							key={i}
							className="carousel-card h-[75vh] w-[60vw] flex-shrink-0 overflow-hidden rounded-xl border border-zinc-700"
						>
							<img src={src} alt={`slide ${i + 1}`} className="h-full w-full object-cover" />
						</div>
					))}
				</div>
			</div>

		</section>
	);
}