"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "../tiltCard/tiltCard";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const cards = [
	{
		title: "DESIGN",
		color: "bg-black",
		tilt: "2",
		cardColor: "bg-red-400",
		src: "/1.png",
		description: "We partner with brands to create design systems that scale. Our work includes art direction, responsive web design, and visual content that communicates what words can't.",
	},
	{
		title: "ENGINEERING",
		color: "bg-purple-300",
		tilt: "-4",
		cardColor: "bg-black",
		src: "/2.png",
		description: "We build websites that empower founders and marketers to react quickly, test concepts, and measure results. We cut our teeth at full-stack developers on enterprise platforms and custom builds, and we apply that same discipline to low-code systems like Webflow. We specialize in large-scale migrations from WordPress to Webflow, helping organizations move past painful maintenance and Frankenstein builds to clean, modern systems.",
	},
	{
		title: "STRATEGY",
		color: "bg-teal-200",
		tilt: "2",
		cardColor: "bg-white",
		src: "/3.png",
		description: "Our approach to strategy is precise, efficient, and grounded in expertise. We consider everything from competitive landscape and project goals to tactical plans for SEO and conversion optimization. Strategic planning sets the foundation for creative work, so we move through it quickly and deliberately. Our process eliminates the bottlenecks and endless conceptual discussions that drag out early phases and cause delays downstream.",
	},
	{
		title: "DESIGN",
		color: "bg-black",
		tilt: "-4",
		cardColor: "bg-red-400",
		src: "/4.png",
		description: "We partner with brands to create design systems that scale. Our work includes art direction, responsive web design, and visual content that communicates what words can't.",
	},
];




export default function CardStack() {
	const sectionRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const cards = gsap.utils.toArray<HTMLElement>(".stack-card");

		cards.forEach((card, i) => {
			if (i === 0) return;

			gsap.set(card, {
				yPercent: 120,
			});
		});

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top top",
				end: () => `+=${window.innerHeight * cards.length}`,
				pin: true,
				scrub: 1.5,
				anticipatePin: 1,
				invalidateOnRefresh: true,
			},
		});

		cards.forEach((card, i) => {
			if (i === 0) return;

			tl.to(card, {
				yPercent: 0,
				duration: 1,
				ease: "none",
			});


		});

		ScrollTrigger.refresh();
	}, { scope: sectionRef, dependencies: [] });

	return (
		<section
			ref={sectionRef}
			className="relative h-screen w-full"
		>
			{cards.map((card, idx) => (
				<div
					key={idx}
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
					style={{
						zIndex: idx - 1,
					}}
				>
					<div className={`stack-card h-screen w-screen flex items-center justify-center font-twid text-[150px] font-bold text-white ${card.color}`}>
						<div className="h-full w-full flex flex-col justify-between p-10">
							<div className="flex flex-col gap-4 leading-none">
								<span className="h-10 w-10 rounded-full border border-white flex items-center justify-center text-xl">{idx + 1}</span>
								<span className={`text-2xl w-[40vw] font-light ${card.color == "bg-black" ? `text-white` : `text-black`}`}>{card.description}</span>
							</div>
							<span className={`${card.color === "bg-black" ? "text-white" : `text-black`}`}>{card.title}</span>
						</div>
						<TiltCard
							className="h-[800px] w-[800px] right-20"
							cardClassName={card.cardColor}
							tilt={card.tilt}
						>
							<div className="relative h-full w-full overflow-hidden">
								<Image
									src={card.src}
									alt={card.title}
									fill
									quality={100}
									className="object-cover"
									sizes="800px"
								/>
							</div>
						</TiltCard>
					</div>
				</div>
			))}
		</section>
	);
}


