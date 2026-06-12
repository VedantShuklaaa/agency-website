"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = ["MOTION.", "BRANDING.", "UI/UX."];

export default function HeroText() {
	return (
		<div className="flex flex-col items-between justify-center ">
			<div className="h-[50vh] border-b border-black dark:border-zinc-700 flex items-end justify-between py-7 px-7">
				<div className="h-[45vh] w-[30vw] text-7xl font-twid font-[500] flex flex-col">
					<span>DESIGN STUDIO</span>
					<span>FOR TIMELESS</span>
					<RotatingText />
				</div>
				<div className="h-[45vh] w-[25vw] border rounded-xl bg-black dark:bg-white"></div>
			</div>

			<div className="h-[35vh] w-full border-b border-black dark:border-zinc-600 flex items-center justify-center">
				<span className="text-[17vw] font-twid font-[500] leading-none">
					creative apes
				</span>
			</div>

			<div className="h-[10vh] w-full border-b border-black dark:border-zinc-600 text-lg flex items-end justify-between px-7 py-2 text-black dark:text-zinc-400 font-twid">
				<span>Powered by AI-enhanced workflows</span>
				<span>Pune, Bangalore - India</span>
			</div>
		</div>
	)
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
								initial: {
									y: "100%",
									opacity: 0,
								},
								animate: {
									y: 0,
									opacity: 1,
								},
								exit: {
									y: "-100%",
									opacity: 0,
								},
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