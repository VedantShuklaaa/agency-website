"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroMediaSectionProps {
	project: {
		title: string;
		src: string;
		video?: string;
	};
}

export default function HeroMediaSection({ project }: HeroMediaSectionProps) {
	const sectionRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

	return (
		<section
			ref={sectionRef}
			className="flex h-screen w-full items-center justify-center border-b border-zinc-100 dark:border-zinc-900"
		>
			<motion.div
				className="relative mx-auto"
				style={{ width: "80vw", height: "80vh", scale }}
				initial={{ y: 120, opacity: 0 }}
				whileInView={{ y: 0, opacity: 1 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
			>
				{project.video ? (
					<video
						src={project.video}
						poster={project.src}
						autoPlay
						muted
						loop
						playsInline
						className="absolute inset-0 h-full w-full rounded-2xl object-cover"
					/>
				) : (
					<Image
						src={project.src}
						alt={project.title}
						fill
						priority
						className="rounded-2xl object-cover"
						sizes="70vw"
					/>
				)}
			</motion.div>
		</section>
	);
}