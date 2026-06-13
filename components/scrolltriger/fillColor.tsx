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
	stagger = 0.01,
	start = "top 80%",
	end = "bottom 40%",
}: ScrollRevealTextProps) {
	const container = useRef<HTMLParagraphElement>(null);

	useGSAP(
		() => {
			if (!container.current) return;
			const words = container.current.querySelectorAll(".char");

			gsap.to(words, {
				color: "var(--foreground)",
				stagger: 0.03,
				ease: "none",
				scrollTrigger: {
					trigger: container.current,
					start,
					end,
					scrub: 1,
				},
			});
		},
		{ scope: container }
	);

	return (
		<p
			ref={container}
			className={`mix-blend-difference ${className}`}
		>
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