"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Second() {
	const containerRef = useRef<HTMLDivElement>(null);
	const cultureRef = useRef<HTMLSpanElement>(null);
	const communityRef = useRef<HTMLSpanElement>(null);
	const consistencyRef = useRef<HTMLSpanElement>(null);

	useGSAP(
		() => {
			const words = [cultureRef.current, communityRef.current, consistencyRef.current];

			gsap.set(words, { xPercent: -50, yPercent: -50, x: 0, y: 300, opacity: 0 });

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top top",
					end: "+=350%",
					pin: true,
					scrub: 1,
					anticipatePin: 1,
					invalidateOnRefresh: true,
				},
			});

			// phase 1: three words rise from bottom and stack at center
			tl.to(cultureRef.current, { y: -160, opacity: 1, ease: "power3.out", duration: 1 }, 0);
			tl.to(communityRef.current, { y: 0, opacity: 1, ease: "power3.out", duration: 1 }, 0.15);
			tl.to(consistencyRef.current, { y: 160, opacity: 1, ease: "power3.out", duration: 1 }, 0.3);

			// phase 2: top word moves left, center stays, bottom moves right
			tl.to(cultureRef.current, { x: -800, scale: 0.3, ease: "power2.inOut", duration: 1 }, 1.6);
			tl.to(communityRef.current, { scale:0.3, ease: "power2.out", duration: 1 }, 1.6);
			tl.to(consistencyRef.current, { x: 800, scale: 0.3, ease: "power2.inOut", duration: 1 }, 1.6);

			// phase 3: all three drop down and align as a row along the bottom
			tl.to(words, { y: 500, ease: "power2.inOut", duration: 1 }, 2.9);
		},
		{ scope: containerRef }
	);

	return (
		<div ref={containerRef} className="h-screen w-full bg-white flex items-center justify-center relative overflow-hidden">
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

			<div className="absolute top-1/2 left-1/2 z-50 text-black font-anton">
				<span
					ref={cultureRef}
					className="absolute top-0 left-0 leading-none whitespace-nowrap text-display-lg sm:text-display-lg font-bold"
				>
					CULTURE
				</span>
				<span
					ref={communityRef}
					className="absolute top-0 left-0 leading-none whitespace-nowrap text-display-lg sm:text-display-lg font-bold"
				>
					COMMUNITY
				</span>
				<span
					ref={consistencyRef}
					className="absolute top-0 left-0 leading-none whitespace-nowrap text-display-lg sm:text-display-lg font-bold"
				>
					CONSISTENCY
				</span>
			</div>
		</div>
	);
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

	useGSAP(
		() => {
			const track = trackRef.current;
			const container = containerRef.current;

			if (!track || !container) return;

			gsap.fromTo(
				track,
				{ y: -speed },
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
		},
		{ scope: containerRef, dependencies: [] }
	);

	return (
		<div
			ref={containerRef}
			className={`relative h-screen overflow-hidden pointer-events-none blur-sm ${className}`}
		>
			<div ref={trackRef} className="absolute inset-0 flex flex-col justify-center gap-4">
				{children}
				{children}
				{children}
				{children}
				{children}
				{children}
				{children}
			</div>
		</div>
	);
}