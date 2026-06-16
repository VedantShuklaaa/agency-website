"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface FloatingCardProps {
	children: React.ReactNode;
	className?: string;
	y?: number;
}

export default function FloatingCard({
	children,
	className = "",
	y = 80,
}: FloatingCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!cardRef.current) return;

		gsap.fromTo(
			cardRef.current,
			{
				y: y,
			},
			{
				y: -y,
				ease: "none",
				scrollTrigger: {
					trigger: cardRef.current,
					start: "top bottom",
					end: "bottom top",
					scrub: 1.5,
				},
			}
		);
	}, { scope: cardRef, dependencies: [] });

	return (
		<div
			ref={cardRef}
			className={className}
		>
			{children}
		</div>
	);
}