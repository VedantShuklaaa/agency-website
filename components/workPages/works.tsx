"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";


export default function Works() {
	const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		cardsRef.current.forEach((card) => {
			if (!card) return;

			gsap.fromTo(
				card,
				{
					opacity: 0,
					scale: 0.9,
					y: 50,
				},
				{
					opacity: 1,
					scale: 1,
					y: 0,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: card,
						start: "top 85%",
						toggleActions: "play none none reverse",
					},
				}
			);
		});
	}, { scope: containerRef, dependencies: [] });
	return (
		<div className="w-full flex flex-col p-4 font-twid gap-8" ref={containerRef}>
			{projects.map((items, idx) => (
				<Link
					key={idx}
					href={`/work/${items.slug}`}
				>
					<div
						className="h-[60vh] w-full border flex"
						ref={(el) => {
							cardsRef.current[idx] = el;
						}}
					>
						<div className="h-full w-full bg-black">

						</div>
						<div className="h-full w-full flex flex-col p-4">
							<div className="h-[90%] w-full flex items-center justify-center text-7xl">{items.title}</div>
							<div className="h-[10%] w-full flex flex-col">
								<span className="text-2xl">{items.description}</span>
								<span className="text-black dark:text-zinc-400">Bengaluru, India</span>
							</div>
						</div>
					</div>
				</Link>
			))}
		</div>
	)
}

const projects = [
	{
		title: "Groww",
		description: "Launch Video Campaign",
		slug: "Groww",
	},
	{
		title: "Cult",
		description: "Smartwatch Launch Video",
		slug: "Cult",
	},
	{
		title: "Arovalis",
		description: "Brand Identity Design",
		slug: "Arovalis",
	},
	{
		title: "Pure Project",
		description: "Brand Identity & Packaging Design",
		slug: "Pur Project",
	},
	{
		title: "Slice",
		description: "Feature Launch Commercial",
		slug: "Slice",
	},
	{
		title: "MadDrop",
		description: "Website Design & Development",
		slug: "MadDrop",
	},
];