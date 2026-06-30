"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BottomDesc from "../layout/bottomDesc/bottomDesc";

export default function Hero() {
	return (
		<div className="min-h-[40vh] lg:min-h-[60vh] w-full flex flex-col border-b border-zinc-100 dark:border-zinc-900">
			<div className="h-[70vh] w-full border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-center px-4 lg:px-6">
				<AnimatedLetters
					text="WE BUILD BRANDS THAT PEOPLE REMEMBER."
					className="text-display-sm md:text-display-md lg:text-display-lg font-anton text-center justify-center w-[82vw]"
				/>
			</div>

			<div className="flex-1 w-full flex flex-col lg:flex-row items-center px-4 lg:px-6 py-6 lg:py-0 gap-6 lg:gap-0">
				<div className="hidden lg:block h-full w-full" />

				<div className="w-full lg:w-[80vw] text-heading-lg md:text-heading-xl font-light leading-tight flex flex-col gap-2">
					<span>Great destinations aren&apos;t built by doing more. They&apos;re built by making every part of the business work together.</span>
					<span>The WILDBOYS Operating System brings strategy, brand, experiences, talent, community, and operations into one connected framework—aligning every part of the business to create stronger destinations and measurable business performance.</span>
				</div>
			</div>

			<BottomDesc text1="© Studio Capabilities" text3="Digital Execution" className="text-black dark:text-zinc-600" />
		</div>
	);
}

interface AnimatedLettersProps {
	text: string;
	className?: string;
	stagger?: number;
	delay?: number;
}

export function AnimatedLetters({
	text,
	className = "",
	stagger = 0.04,
	delay = 0,
}: AnimatedLettersProps) {
	const containerRef = useRef<HTMLParagraphElement>(null);

	useGSAP(
		() => {
			const letters = containerRef.current
				? gsap.utils.toArray<HTMLElement>(containerRef.current.querySelectorAll(".animated-letter"))
				: [];

			gsap.set(letters, { y: 80, opacity: 0 });
			gsap.to(letters, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: "power4.out",
				stagger,
				delay,
			});
		},
		{ scope: containerRef }
	);

	const words = text.split(" ");

	return (
		<p ref={containerRef} className={`flex flex-wrap overflow-hidden ${className}`}>
			{words.map((word, wi) => (
				<span key={wi} className="inline-flex">
					{word.split("").map((char, ci) => (
						<span key={ci} className="animated-letter inline-block" style={{ lineHeight: 1 }}>
							{char}
						</span>
					))}
					{wi < words.length - 1 && (
						<span className="animated-letter inline-block" style={{ lineHeight: 1 }}>
							&nbsp;
						</span>
					)}
				</span>
			))}
		</p>
	);
}