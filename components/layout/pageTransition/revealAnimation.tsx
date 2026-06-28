// components/layout/revealSection.tsx
"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealSectionProps {
	children: ReactNode;
	/** distance (px) the section travels as it fades in */
	y?: number;
	/** animation duration in seconds */
	duration?: number;
	/** delay before this section's animation can start, in seconds */
	delay?: number;
	className?: string;
}

export default function RevealSection({
	children,
	y = 60,
	duration = 1,
	delay = 0,
	className,
}: RevealSectionProps) {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				el,
				{ autoAlpha: 0, y },
				{
					autoAlpha: 1,
					y: 0,
					duration,
					delay,
					ease: "power3.out",
					scrollTrigger: {
						trigger: el,
						start: "top 85%", // animation starts when top of section hits 85% down the viewport
						toggleActions: "play none none none", // plays once, doesn't reverse on scroll up
					},
				}
			);
		}, ref);

		return () => ctx.revert();
	}, [y, duration, delay]);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}