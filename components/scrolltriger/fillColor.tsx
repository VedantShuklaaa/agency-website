"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollRevealText() {
	const container = useRef<HTMLParagraphElement>(null);

	useGSAP(() => {
		if (!container.current) return;
		const chars = container.current?.querySelectorAll(".char");

		gsap.to(chars, {
			color: "#ffffff",
			stagger: 0.02,
			ease: "none",
			scrollTrigger: {
				trigger: container.current,
				start: "top 80%",
				end: "bottom 40%",
				scrub: true,
			},
		});
	});

	const text =
		"We’re a creative design and development studio based in India, working with brands across branding, UI/UX, motion, and interactive web experiences. Our focus is on building clear, scalable digital systems, supported by AI-enhanced workflows that help us move faster without compromising craft.";

	return (
		<p
			ref={container}
			className="text-4xl font-twid font-medium leading-tight"
		>
			{text.split("").map((char, i) => (
				<span
					key={i}
					className="char text-zinc-400"
				>
					{char}
				</span>
			))}
		</p>
	);
}