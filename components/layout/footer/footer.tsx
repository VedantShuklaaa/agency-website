"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [hovered, setHovered] = useState(false);

	useGSAP(
		() => {
			gsap.set([".footer-brand", ".footer-meta"], { y: 40, opacity: 0 });

			gsap.to([".footer-brand", ".footer-meta"], {
				y: 0,
				opacity: 1,
				duration: 0.9,
				ease: "power3.out",
				stagger: 0.1,
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 85%",
				},
			});
		},
		{ scope: containerRef }
	);

	const year = new Date().getFullYear();

	return (
		<div
			ref={containerRef}
			className="w-full overflow-hidden bg-background font-onest px-4 lg:px-10 py-12 lg:py-16 flex flex-col gap-8"
		>
			<div
				className="footer-brand flex flex-col items-center lg:items-start"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<h1 className="font-[800] leading-none text-display-sm md:text-display-md text-center tracking-tight cursor-default">
					Wildboys Tribe — Nightlife &amp; Entertainment Architects
				</h1>
				<motion.div
					className="h-px bg-[#ff0000] mt-2"
					initial={{ width: "0%" }}
					animate={{ width: hovered ? "100%" : "0%" }}
					transition={{ duration: 0.4, ease: "easeOut" }}
				/>
			</div>

			<div className="footer-meta w-full flex flex-col lg:flex-row items-center justify-between gap-3 text-sm text-zinc-500 dark:text-zinc-400 text-center">
				<span>© {year} Wildboys Tribe. All rights reserved.</span>
				<span>Built for destinations that last.</span>
			</div>
		</div>
	);
}