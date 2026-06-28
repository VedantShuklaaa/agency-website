"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
	children: ReactNode;
	y?: number;
	duration?: number;
	className?: string,
}

export default function Reveal({
	children,
	y = 100,
	duration = 0.8,
	className
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
			className={`border-b border-zinc-100 dark:border-zinc-900 ${className}`}
		>
			{children}
		</motion.div>
	);
}