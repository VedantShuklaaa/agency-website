"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MarqueeProps {
	text: string;
	speed?: number;
	repeatCount?: number;
	className?: string;
	containerClassName?: string;
}

export default function Marquee({
	text,
	speed = 60,
	repeatCount = 8,
	className = "mx-4 md:mx-6 lg:mx-8 text-display-lg font-medium",
	containerClassName = "overflow-hidden py-4 md:py-6 flex items-center",
}: MarqueeProps) {
	const trackRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const track = trackRef.current;
		if (!track) return;

		const createTween = () => {
			const distance = track.scrollWidth / 2;
			return gsap.to(track, {
				x: -distance,
				duration: speed,
				ease: "none",
				repeat: -1,
			});
		};

		let tween = createTween();

		const ro = new ResizeObserver(() => {
			tween.kill();
			gsap.set(track, { x: 0 });
			tween = createTween();
		});
		ro.observe(track);

		return () => {
			tween.kill();
			ro.disconnect();
		};
	}, [speed]);

	return (
		<div className={containerClassName}>
			<div
				ref={trackRef}
				className="flex w-max whitespace-nowrap"
			>
				{[...Array(2)].map((_, copy) =>
					[...Array(repeatCount)].map((_, i) => (
						<span
							key={`${copy}-${i}`}
							className={className}
						>
							{text}
						</span>
					))
				)}
			</div>
		</div>
	);
}