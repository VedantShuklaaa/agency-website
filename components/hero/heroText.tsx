"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { headingClass } from "@/lib/constants";

const words = ["CULTURE.", "COMMUNITY.", "CONSISTENCY."];

interface HeroTextProps {
	heroTitleRef: React.RefObject<HTMLElement | null>;
}

export default function HeroText({ heroTitleRef }: HeroTextProps) {
	return (
		<div className="flex flex-col bg-background" id="top">
			<div className="border-b border-zinc-100 dark:border-zinc-900 flex flex-col lg:flex-row items-end justify-between px-4 py-7 lg:px-7 gap-6 lg:gap-0">
				<div className="w-full lg:w-[45vw] lg:h-[45vh] flex flex-col font-twid font-medium text-3xl md:text-5xl lg:text-6xl leading-none">
					<span>FROM EMPTY SPACES</span>
					<span>TO HIGH-DEMAND DESTINATIONS</span>
					<span>WE ARCHITECT</span>
					<RotatingText />
				</div>

				<div className="relative h-[30vh] w-full overflow-hidden rounded-xl border bg-black dark:bg-white md:h-[35vh] lg:h-[45vh] lg:w-[25vw]">
					<Image
						src="/1.png"
						alt="Your image"
						priority
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 25vw"
					/>
				</div>
			</div>

			<div className="py-2 w-full border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-center px-4">
				<motion.span ref={heroTitleRef} className={headingClass}>
					<span>WILDBOYS TRIBE</span>
					<span>NIGHTLIFE & ENTERTAINMENT ARCHITECTS</span>
				</motion.span>
			</div>

			<div className="min-h-[6vh] w-full border-b border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 px-4 lg:px-7 py-2 font-twid text-sm md:text-base lg:text-lg text-black dark:text-zinc-400">
				<span>Powered by AI-enhanced workflows</span>
				<span>Pune, Bangalore - India</span>
			</div>
		</div>
	);
}

function RotatingText() {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % words.length);
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="relative h-[1.2em] overflow-hidden">
			<AnimatePresence mode="sync">
				<motion.div
					key={words[index]}
					className="absolute left-0 top-0 flex"
					initial="initial"
					animate="animate"
					exit="exit"
				>
					{words[index].split("").map((char, i) => (
						<motion.span
							key={i}
							variants={{
								initial: { y: "100%", opacity: 0 },
								animate: { y: 0, opacity: 1 },
								exit: { y: "-100%", opacity: 0 },
							}}
							transition={{
								duration: 0.4,
								delay: i * 0.04,
								ease: [0.76, 0, 0.24, 1],
							}}
							className="inline-block"
						>
							{char === " " ? "\u00A0" : char}
						</motion.span>
					))}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}