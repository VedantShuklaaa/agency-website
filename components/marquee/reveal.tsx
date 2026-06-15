"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
	children: ReactNode;
	y?: number;
	duration?: number;
}

export default function Reveal({
	children,
	y = 100,
	duration = 0.8,
}: RevealProps) {
	return (
		<motion.div
			initial={{
				opacity: 0,
				y,
			}}
			whileInView={{
				opacity: 1,
				y: 0,
			}}
			viewport={{
				once: false,
				amount: 0.2,
			}}
			transition={{
				duration,
				ease: [0.22, 1, 0.36, 1],
			}}
			className="border-b border-black dark:border-zinc-600"
		>
			{children}
		</motion.div>
	);
}