"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
	text: string;
	className?: string;
	initialColor?: string;
	stagger?: number;
	start?: string;
	end?: string;
}

export default function ScrollRevealText({
	text,
	className = "",
	initialColor = "text-zinc-600",
	stagger = 0.1,
	start = "top 75%",
	end = "top 45%",
}: ScrollRevealTextProps) {
	const container = useRef<HTMLParagraphElement>(null);

	useGSAP(
		() => {
			if (!container.current) return;

			const words = container.current.querySelectorAll(".char");

			gsap.to(words, {
				color: "var(--foreground)",
				stagger,
				ease: "none",
				scrollTrigger: {
					trigger: container.current,
					start,
					end,
					scrub: 0.5,
				},
			});
		},
		{ scope: container, dependencies: [] }
	);

	return (
		<p ref={container} className={`${className}`}>
			{text.split(" ").map((word, i) => (
				<span
					key={i}
					className={`char ${initialColor}`}
					style={{
						display: "inline-block",
						marginRight: "0.25em",
					}}
				>
					{word}
				</span>
			))}
		</p>
	);
}