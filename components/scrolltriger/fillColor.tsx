"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
interface ScrollRevealTextProps {
	text: string;
	className?: string;
	stagger?: number;
	start?: string;
	end?: string;
}

export default function ScrollRevealText({
	text,
	className = "",
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
					className="char"
					style={{
						display: "inline-block",
						marginRight: "0.25em",
						color: "var(--initial-foreground)",
					}}
				>
					{word}
				</span>
			))}
		</p>
	);
}


type SequentialRevealProps = {
	texts: string[];
	className?: string;
	stagger?: number;
};

export function SequentialReveal({
	texts,
	className = "",
	stagger = 0.08,
}: SequentialRevealProps) {
	const container = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!container.current) return;

		const groups = gsap.utils.toArray<HTMLElement>(".reveal-group", container.current);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: container.current,
				start: "top 75%",
				end: "bottom 45%",
				scrub: 0.5,
			},
		});

		groups.forEach((group) => {
			const words = group.querySelectorAll(".char");

			tl.to(
				words,
				{
					color: "var(--foreground)",
					stagger,
					ease: "none",
					duration: 1,
				},
				">"
			);
		});
	}, { scope: container });

	return (
		<div ref={container} className="space-y-6">
			{texts.map((text, index) => (
				<p key={index} className={`reveal-group ${className}`}>
					{text.split(" ").map((word, i) => (
						<span
							key={i}
							className="char"
							style={{
								display: "inline-block",
								marginRight: "0.25em",
								color: "var(--initial-foreground)",
							}}
						>
							{word}
						</span>
					))}
				</p>
			))}
		</div>
	);
}