"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ScrollRevealText from "@/components/scrolltriger/fillColor";
import SlidingText from "../layout/aboutUsButton/aboutUsButton";

const items = [
	"WORK",
	"ABOUT",
	"SERVICES",
	"CONTACT",
];

const text = "We’re a creative design and development studio based in India, working with brands across branding, UI/UX, motion, and interactive web experiences. Our focus is on building clear, scalable digital systems, supported by AI-enhanced workflows that help us move faster without compromising craft.";


export default function Hero2() {
	const [active, setActive] = useState<string | null>(null);

	return (
		<div className="h-[70vh] w-full border-b border-black dark:border-zinc-600 flex" id="about">
			<div className="h-full w-full flex flex-col relative justify-center p-4">
				<div className="h-full w-full flex flex-col justify-center">
					{items.map((item) => (
						<div
							key={item}
							onMouseEnter={() => setActive(item)}
							onMouseLeave={() => setActive(null)}
							className="relative flex items-center justify-between w-full cursor-pointer overflow-hidden px-4"
						>
							{/* Animated Background */}
							<AnimatePresence>
								{active === item && (
									<motion.div
										className="absolute inset-0 bg-[#ff2d55] z-0 origin-left"
										initial={{ scaleX: 0 }}
										animate={{ scaleX: 1 }}
										exit={{ scaleX: 0 }}
										transition={{
											duration: 0.4,
											ease: [0.76, 0, 0.24, 1],
										}}
									/>
								)}
							</AnimatePresence>

							{/* Text */}
							<h1 className="relative z-10 text-black dark:text-white text-6xl md:text-7xl font-medium font-twid leading-[0.9] tracking-tight py-1 ">
								{item}
							</h1>

							{/* Arrow */}
							<div className="relative z-20 flex items-center justify-center w-24">
								{active === item && (
									<motion.div
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{
											duration: 0.25,
										}}
									>
										<ArrowRight
											size={80}
											strokeWidth={1.5}
											className="text-white"
										/>
									</motion.div>
								)}
							</div>
						</div>
					))}
				</div>
				<span className="text-lg font-twid font-[300] text-black dark:text-zinc-400">© Featured Projects</span>
			</div>
			<div className="h-full w-full flex flex-col items-start justify-between p-4">
				<div />

				<div className="flex flex-col gap-4">
					<ScrollRevealText text={text} className="text-4xl" />
					<div className="group relative w-fit h-10 px-5 border-2 rounded-xl border-black dark:border-white flex items-center justify-center overflow-hidden">
						<div className="absolute inset-0 bg-[#ff2d55] origin-bottom scale-y-0 transition-transform duration-500 ease-in-out group-hover:scale-y-100 rounded-xl" />
						<span className="relative z-10"><SlidingText text="ABOUT US" /></span>
					</div>
				</div>

				<div className="w-full text-lg flex items-center justify-between font-[300] text-black dark:text-zinc-400">
					<span>(CAD® — 03)</span>
					<span>Digital Showcase</span>
				</div>
			</div>
		</div>
	)
}