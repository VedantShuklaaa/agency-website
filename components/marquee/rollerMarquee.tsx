"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Marquee from "./marquee1";
import BottomDesc from "../layout/bottomDesc/bottomDesc";
import { CARDS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollCarousel() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

	useGSAP(
		() => {
			const section = sectionRef.current;
			const track = trackRef.current;
			if (!section || !track) return;

			const getScrollDistance = () =>
				Math.max(0, track.scrollWidth - section.clientWidth);

			gsap.set(cardsRef.current, {
				opacity: 0.65,
				y: 30,
				scale: 0.96,
			});

			gsap.to(track, {
				x: () => -getScrollDistance(),
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top top",
					end: () => `+=${getScrollDistance()}`,
					scrub: 1,
					pin: true,
					anticipatePin: 1,
					invalidateOnRefresh: true,
				},
			});

			cardsRef.current.forEach((card) => {
				if (!card) return;

				gsap.to(card, {
					opacity: 1,
					y: 0,
					scale: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: card,
						start: "left 88%",
						end: "left 50%",
						scrub: 1,
						containerAnimation: ScrollTrigger.getAll().find(
							(trigger) => trigger.trigger === section
						)?.animation,
					},
				});
			});
		},
		{ scope: sectionRef }
	);

	return (
		<section
			ref={sectionRef}
			className="relative hidden overflow-hidden border-b border-zinc-100 font-twid dark:border-zinc-900 md:flex md:min-h-screen md:flex-col"
		>
			<BottomDesc text1="Clients" text3="Selected Collaborations" className="border-b border-zinc-100 dark:border-zinc-900 text-black dark:text-zinc-400" />
			{/* Marquee 
			<div className="flex w-full border-b border-zinc-100 dark:border-zinc-900">
				<Marquee text="@Clients" />
			</div>*/}

			{/* Horizontal scroll area */}
			<div className="flex flex-1 items-center">
				<div
					ref={trackRef}
					className="flex items-center gap-4 px-4 py-8 md:gap-6 md:px-6 lg:gap-8 lg:px-8"
				>
					{CARDS.map((card, i) => (
						<div
							key={`${card.title}-${i}`}
							ref={(el) => {
								cardsRef.current[i] = el;
							}}
							className="group relative flex h-[260px] w-[78vw] flex-shrink-0 overflow-hidden rounded-3xl border border-zinc-200 bg-white/60 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#ff2d55]/60 hover:shadow-[0_0_0_1px_rgba(255,45,85,0.15),0_24px_80px_rgba(255,45,85,0.18)] dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-[#ff2d55]/50 dark:hover:shadow-[0_0_0_1px_rgba(255,45,85,0.18),0_24px_80px_rgba(255,45,85,0.18)] md:h-[360px] md:w-[58vw] lg:h-[42vh] lg:w-[32vw]"
						>
							<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
								<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,45,85,0.14),transparent_45%)]" />
							</div>

							<div className="relative z-10 flex h-full w-full flex-col justify-between p-6 md:p-7 lg:p-8">
								<div className="flex items-start justify-between gap-4">
									<span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
										{card.category}
									</span>

									<span className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
										{card.year}
									</span>
								</div>

								<div className="flex flex-1 items-center">
									<h3 className="text-3xl leading-none transition-transform duration-500 group-hover:translate-x-1 sm:text-4xl md:text-5xl lg:text-6xl">
										{card.title}
									</h3>
								</div>

								<div className="flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
									<span className="text-sm text-zinc-600 dark:text-zinc-400">
										Selected collaboration
									</span>

									<span className="text-sm text-zinc-900 transition-transform duration-500 group-hover:translate-x-1 dark:text-zinc-100">
										View project ↗
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<BottomDesc
				text1="Start a conversation"
				text3="Build What's next"
				className="text-black dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-900"
			/>
		</section>
	);
}