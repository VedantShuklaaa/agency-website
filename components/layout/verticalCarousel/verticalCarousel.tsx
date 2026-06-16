"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import SlidingText from "../aboutUsButton/aboutUsButton";

gsap.registerPlugin(ScrollTrigger);

type Step = {
	num: string;
	title: string;
	description: string;
	green?: boolean;
};

const STEPS: Step[] = [
	{
		num: "01",
		title: "Discovery",
		description: "Deep understanding of your venue, audience, and market to build a strong strategic foundation.",
	},
	{
		num: "02",
		title: "Design",
		description: "Crafting positioning, experiences, and systems that create demand and strengthen your brand.",
	},
	{
		num: "03",
		title: "Development",
		description: "Executing plans, managing talent, and driving operations to deliver consistent growth and performance.",
	},
	{
		num: "04",
		title: "Launch",
		description: "From setup to opening, we build momentum and ensure a powerful launch that gets people in.",
	},
	{
		num: "",
		title: "Contact Us",
		description: "Let’s build something impactful together. Reach out and let’s talk.",
		green: true,
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
					className="relative w-[50vw]"
					style={{ height: STEPS.length * (EXPANDED_H + GAP) }}
				>
					{STEPS.map((step, i) => (
						<div
							key={i}
							ref={(el) => {
								cardRefs.current[i] = el;
							}}
							className={`absolute left-0 right-0 rounded-2xl border overflow-hidden will-change-transform ${step.green
								? "bg-emerald-400 text-black border-green-300"
								: "bg-[#0f0f0f] border-white/10"
								}`}
							style={{
								height: EXPANDED_H,
								zIndex: i + 1, // last (red) on top
								boxShadow: step.green
									? "0 -20px 40px -20px rgba(21, 240, 68, 0.35)"
									: "0 -10px 30px -20px rgba(225, 244, 220, 0.6)",
							}}
						>
							<div className="grid grid-cols-[80px_1fr] gap-6 px-8 h-full items-start pt-6">
								<span
									className={`text-sm pt-2 ${step.green ? "text-black/60" : "text-white/40"
										}`}
								>
									{step.green ? "☺" : step.num}
								</span>
								<div className="pr-8">
									<h3
										className="font-medium tracking-tight"
										style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
									>
										{step.title}
									</h3>
									<p
										className={`card-desc mt-4 max-w-xl leading-relaxed ${step.green ? "text-black/70" : "text-white/55"
											}`}
									>
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
		<div className="w-[30vw] flex flex-col gap-6 px-6 py-24">
			<span className="text-4xl font-twid">
				Our process is built to move fast,
				stay flexible, and keep you involved.
				We don’t overcomplicate.
				We focus on what gets results.
			</span>

			<div className="group relative w-fit h-10 px-5 border-2 rounded-xl border-black dark:border-white flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 bg-[#ff2d55] origin-bottom scale-y-0 transition-transform duration-500 ease-in-out group-hover:scale-y-100 rounded-xl" />
				<span className="relative z-10">
					<SlidingText text="ABOUT US" />
				</span>
			</div>
		</div>
	);
}