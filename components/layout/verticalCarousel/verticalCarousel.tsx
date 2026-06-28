"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import SlidingText from "../aboutUsButton/aboutUsButton";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type Step = {
	num: string;
	title: string;
	description: string;
	red?: boolean;
};

const STEPS: Step[] = [
	{
		num: "01",
		title: "DISCOVER",
		description: "Understand the venue, audience, opportunities, and constraints before designing the system.",
	},
	{
		num: "02",
		title: "ARCHITECT",
		description: "Design the strategy, systems, and roadmap required to achieve the desired outcome.",
	},
	{
		num: "03",
		title: "ACTIVATE",
		description: "Bring the vision to life through experiences, partnerships, programming, and execution.",
	},
	{
		num: "04",
		title: "OPTIMIZE",
		description: "Refine performance, strengthen execution, and amplify what works.",
	},
	{
		num: "",
		title: "PARTNER WITH US",
		description: "Ready to unlock your venue's next stage of growth? Let's build something worth returning to.",
		red: true,
	},
];

const EXPANDED_H = 200;
const COMPACT_H = 84;
const GAP = 16;
const PEEK = 10;

export function ProcessCardRight() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	useIsomorphicLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
			const n = cards.length;

			const initialTops = cards.map((_, i) => i * (EXPANDED_H + GAP));

			const finalTops = cards.map((_, i) => {
				if (i === n - 1) return 0;
				return (n - 1 - i) * PEEK + 4;
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top top",
					end: `+=${n * 150}`,
					pin: true,
					pinSpacing: false,
					scrub: 1,
				}
			});

			cards.forEach((card, i) => {
				const desc = card.querySelector(".card-desc") as HTMLElement | null;
				const isRed = i === n - 1;

				if (desc && !isRed) {
					tl.to(
						desc,
						{ autoAlpha: 0, ease: "none" },
						0,
					);
				}

				tl.to(card, {
					height: isRed ? EXPANDED_H : COMPACT_H,
					ease: "none",
				}, 0,
				);

				tl.to(card, {
					top: finalTops[i],
					ease: "none",
				}, 0,
				);
			});

			cards.forEach((card, i) => {
				card.style.top = `${initialTops[i]}px`;
			});

			if (stageRef.current) {
				stageRef.current.style.height =
					`${initialTops[n - 1] + EXPANDED_H}px`;
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			className="relative w-full overflow-hidden"
		>
			<div className="flex justify-end px-6 py-24">
				<div
					ref={stageRef}
					className="relative w-full"
					style={{ height: STEPS.length * (EXPANDED_H + GAP) }}
				>
					{STEPS.map((step, i) => (
						<div
							key={i}
							ref={(el) => {
								cardRefs.current[i] = el;
							}}
							className={`absolute left-0 right-0 rounded-2xl border overflow-hidden will-change-transform ${step.red
								? "bg-[#FF0000]/60 text-black border-red-500"
								: "bg-zinc-300 dark:bg-[#0f0f0f] border-white/10"
								}`}
							style={{
								height: EXPANDED_H,
								zIndex: i + 1, // last (red) on top
								boxShadow: step.red
									? "0 -20px 40px -20px rgba(255, 0, 0, 0.35)"
									: "0 -10px 30px -20px rgba(225, 244, 220, 0.6)",
							}}
						>
							<div className="grid grid-cols-1 md:px-8 h-full items-start">
								<span className={`text-sm p-2 ${step.red ? "text-black/60" : "text-black dark:text-white/40"}`}>
									{step.red ? "☺" : step.num}
								</span>
								<div className="px-2">
									<h3
										className="font-medium tracking-tight text-heading-xl"
									>
										{step.title}
									</h3>
									<p className={`card-desc mt-4 max-w-5xl leading-relaxed ${step.red ? "text-black/70" : "text-zinc-600 dark:text-white/55"}`} >
										{step.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default function ProcessCardLeft() {
	return (
		<div className="w-full flex flex-col gap-6 px-6 py-24 leading-none">
			<span className="text-heading-xl font-twid">
				Our framework exists to replace fragmented execution with a unified operating system—aligning every moving part of the venue into a structure designed to perform, adapt, and compound over time.
				No venue succeeds because of a single activity. Performance emerges when every part of the business works together as one system.
			</span>

			<Link className="group relative w-fit h-10 px-5 border-2 rounded-xl border-black dark:border-white flex items-center justify-center overflow-hidden" href="/about">
				<div className="absolute inset-0 bg-[#FF0000] origin-bottom scale-y-0 transition-transform duration-500 ease-in-out group-hover:scale-y-100 rounded-xl" />
				<span className="relative z-10">
					<SlidingText text="ABOUT US" />
				</span>
			</Link>
		</div>
	);
}