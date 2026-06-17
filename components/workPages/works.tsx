"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";


export default function Works() {
	const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		cardsRef.current.forEach((card) => {
			if (!card) return;

			gsap.fromTo(card, {
				opacity: 0,
				scale: 0.9,
				y: 50,
			}, {
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
						className=" flex flex-col lg:flex-row w-full border overflow-hidden min-h-[300px] lg:h-[500px] xl:h-[500px]"
						ref={(el) => {
							cardsRef.current[idx] = el;
						}}
					>
						{/* Image Section */}
						<div className="group relative w-full lg:w-1/2 aspect-[16/10] lg:aspect-auto overflow-hidden">
							<Image
								src={items.src}
								alt={items.title}
								fill
								className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
						</div>

						{/* Content Section */}
						<div className="flex flex-col justify-between w-full lg:w-1/2 p-6 md:p-8 lg:p-10 gap-6">
							<div className=" flex-1 flex items-center">
								<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none break-words">
									{items.title}
								</h2>
							</div>

							<div className="flex flex-col gap-1">
								<span className=" text-base sm:text-lg md:text-xl">
									{items.description}
								</span>

								<span className=" text-sm md:text-base text-black dark:text-zinc-400" >
									Bengaluru, India
								</span>
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
		src: "/1.png",
	},
	{
		title: "Cult",
		description: "Smartwatch Launch Video",
		slug: "Cult",
		src: "/2.png",
	},
	{
		title: "Arovalis",
		description: "Brand Identity Design",
		slug: "Arovalis",
		src: "/3.png",
	},
	{
		title: "Pure Project",
		description: "Brand Identity & Packaging Design",
		slug: "Pur Project",
		src: "/4.png",
	},
	{
		title: "Slice",
		description: "Feature Launch Commercial",
		slug: "Slice",
		src: "/5.png",
	},
	{
		title: "MadDrop",
		description: "Website Design & Development",
		slug: "MadDrop",
		src: "/6.png",
	},
];