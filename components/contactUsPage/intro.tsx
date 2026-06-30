"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { AnimatedLetters } from "../servicesPage/hero";

const LINE_3 = "The future isn't waiting to be discovered. It's waiting to be built. Tell us what you're building.";

export default function Intro() {
	const introRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const line1Letters = gsap.utils.toArray<HTMLElement>(".line-1 .letter");
			const line2Letters = gsap.utils.toArray<HTMLElement>(".line-2 .letter");

			gsap.set([...line1Letters, ...line2Letters], { y: 60, opacity: 0 });
			gsap.to(line1Letters, { y: 0, opacity: 1, duration: 0.8, ease: "power4.out", stagger: 0.035 });
			gsap.to([...line2Letters].reverse(), { y: 0, opacity: 1, duration: 0.8, ease: "power4.out", stagger: 0.045 });
		},
		{ scope: introRef }
	);

	return (
		<div ref={introRef} className="h-[50vh] md:h-[70vh] w-full flex flex-col items-center justify-center font-anton gap-4">
			<div className="h-[70vh] w-full border-b border-zinc-100 dark:border-zinc-900 flex flex-col items-center justify-center px-4 lg:px-6">
				<AnimatedLetters
					text="BUILD WHAT DOESN'T EXIST"
					className="text-display-sm md:text-display-md lg:text-display-lg font-anton text-center justify-center text-black w-[75vw]"
				/>

				<motion.div
					className="line-2 flex flex-wrap justify-center tracking-lighter text-xl md:text-display-sm text-center lg:text-display-md xl:text-heading-xl text-black"
					initial={{ y: 60, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
				>
					{LINE_3}
				</motion.div>
			</div>
		</div>
	);
}