"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SequentialReveal } from "@/components/scrolltriger/fillColor";
import SlidingText from "../layout/aboutUsButton/aboutUsButton";
import BottomDesc from "../layout/bottomDesc/bottomDesc";
import TransitionLink from "../layout/pageTransition/transitionLink";

const items = [
	{ label: "WORK", href: "/work" },
	{ label: "ABOUT", href: "/about" },
	{ label: "SERVICES", href: "/services" },
	{ label: "CONTACT", href: "/contact" },
	{ label: "COMMUNITY", href: "/community" },
];

const text1 = "We are India's First Nightlife & Entertainment Architects. We design operating systems that make venues culturally relevant, community - led, and consistently engaging. ";
const text2 = "WILDBOYS TRIBE exists to help build the next generation of nightlife and entertainment businesses.We believe the most successful businesses are created when culture, community, experiences, operations, and growth work together as one system. ";
const text3 = "We architect the ecosystems that help venues create meaningful experiences, strengthen their market position, build loyal communities, and become more resilient businesses.";


export default function Hero2() {
	const [active, setActive] = useState<string | null>(null);

	return (
		<div
			className="min-h-[70vh] w-full border-b border-zinc-100 dark:border-zinc-900 flex flex-col"
			id="about"
		>
			<div className="flex flex-col lg:flex-row flex-1">
				{/* Left */}
				<div className="w-full lg:w-1/2 flex flex-col relative justify-center p-4">
					<div className="flex flex-col justify-center flex-1">
						{items.map((item, idx) => (
							<TransitionLink
								key={idx}
								href={item.href}
							>
								<div
									onMouseEnter={() => setActive(item.label)}
									onMouseLeave={() => setActive(null)}
									className="relative flex items-center justify-between w-full cursor-pointer overflow-hidden px-2 lg:px-4"
								>
									<AnimatePresence>
										{active === item.label && (
											<motion.div
												className="absolute inset-0 bg-[#FF0000] z-0 origin-left"
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

									<span className="relative z-10 text-black dark:text-white font-medium font-twid leading-[0.9] tracking-tight py-1 text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
										{item.label}
									</span>

									<div className="relative z-20 flex items-center justify-center w-10 md:w-16 lg:w-24">
										{active === item.label && (
											<motion.div
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												exit={{ opacity: 0, x: -20 }}
												transition={{ duration: 0.25 }}
											>
												<ArrowRight
													strokeWidth={1.5}
													className="h-8 w-8 md:h-12 md:w-12 lg:h-20 lg:w-20 text-white"
												/>
											</motion.div>
										)}
									</div>
								</div>

							</TransitionLink>
						))}
					</div>
				</div>

				{/* Right */}
				<div className="w-full lg:w-1/2 flex flex-col items-start justify-center p-4 py-8">
					<div className="flex flex-col gap-4">
						<SequentialReveal
							texts={[text1, text2, text3]}
							className="text-heading-lg"
						/>

						<TransitionLink className="group relative w-fit h-10 px-5 border-2 rounded-xl border-zinc-100 dark:border-white flex items-center justify-center overflow-hidden" href="/about">
							<div className="absolute inset-0 bg-[#FF0000] origin-bottom scale-y-0 transition-transform duration-500 ease-in-out group-hover:scale-y-100 rounded-xl" />
							<span className="relative z-10">
								<SlidingText text="ABOUT US" />
							</span>
						</TransitionLink>
					</div>
				</div>
			</div>

			<BottomDesc text1="© Featured Projects" text2="(CAD® — 03)" text3="Digital Showcase" className="text-black dark:text-zinc-400" />
		</div>
	)
}