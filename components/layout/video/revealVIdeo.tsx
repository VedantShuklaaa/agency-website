"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface BigRevealCardProps {
	children: React.ReactNode;
	className?: string;
}

export default function BigRevealCard({
	children,
	className = "",
}: BigRevealCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!cardRef.current) return;

		gsap.fromTo(
			cardRef.current,
			{
				y: 120,
				scale: 0.9,
			},
			{
				y: 20,
				scale: 1,
				ease: "none",
				scrollTrigger: {
					trigger: cardRef.current,
					start: "top bottom",
					end: "top 50%",
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