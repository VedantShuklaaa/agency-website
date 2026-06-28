"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);


export default function Second() {
	return (
		<div className="h-screen w-full bg-white flex items-center justify-center relative">
			<div className="absolute top-0 w-full h-30 bg-gradient-to-b from-zinc-400 to-transparent" />
			<div className="absolute bottom-0 w-full h-30 bg-gradient-to-t from-zinc-400 to-transparent" />
			<VerticalMarquee className="w-[650px]">
				<div className="flex flex-col gap-2">
					<p className="text-black text-center text-body-lg font-twid">
						Our work goes beyond promotion — we build and operate venues with a
						clear sense of ownership and intent.
					</p>

					<p className="text-black text-center text-body-lg font-twid">
						We approach each project as a complete system, shaping everything
						from brand to operations to ensure it performs at the highest level.
					</p>

					<p className="text-black text-center text-body-lg font-twid">
						Rather than focusing on isolated pieces, we bring everything
						together — creating venues that are cohesive, enduring, and built
						to lead in their market.
					</p>
				</div>
			</VerticalMarquee>

			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-black font-anton">
				<span className="leading-none text-center text-display-lg sm:text-display-lg font-bold flex flex-col">
					<span>CULTURE</span>
					<span>COMMUNITY</span>
					<span>CONSISTENCY</span>
				</span>
			</div>
		</div>
	)
}

interface VerticalMarqueeProps {
	children: React.ReactNode;
	className?: string;
	speed?: number;
}

export function VerticalMarquee({
	children,
	className = "",
	speed = 300,
}: VerticalMarqueeProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const track = trackRef.current;
		const container = containerRef.current;

		if (!track || !container) return;

		gsap.fromTo(
			track,
			{
				y: -speed,
			},
			{
				y: speed,
				ease: "none",
				scrollTrigger: {
					trigger: container,
					start: "top bottom",
					end: "bottom top",
					scrub: 1,
				},
			}
		);
	}, { scope: containerRef, dependencies: [] });

	return (
		<div
			ref={containerRef}
			className={`relative h-screen overflow-hidden pointer-events-none blur-sm ${className}`}
		>
			<div
				ref={trackRef}
				className="absolute inset-0 flex flex-col justify-center gap-4"
			>
				{children}
				{children}
			</div>
		</div>
	);
}