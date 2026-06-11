"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function FeaturedWorkMarquee() {
	const trackRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const track = trackRef.current;

		if (!track) return;

		const distance = track.scrollWidth / 2;

		gsap.to(track, {
			x: -distance,
			duration: 60,
			ease: "none",
			repeat: -1,
		});
	});

	return (
		<div className="overflow-hidden h-[30vh] py-6 border-b border-white dark:border-zinc-600 flex items-center font-twid">
			<div
				ref={trackRef}
				className="flex w-max whitespace-nowrap"
				onMouseEnter={() => gsap.globalTimeline.pause()}
				onMouseLeave={() => gsap.globalTimeline.resume()}
			>
				{[...Array(2)].map((_, copy) =>
					[...Array(8)].map((_, i) => (
						<span
							key={`${copy}-${i}`}
							className="mx-8 text-5xl md:text-[14vw] font-medium font-twid"
						>
							featured works©
						</span>
					))
				)}
			</div>
		</div>
	);
}