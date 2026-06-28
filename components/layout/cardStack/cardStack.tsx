"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiltCard2 } from "../tiltCard/tiltCard";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const cards = [
	{
		title: "DESIGN",
		color: "bg-black",
		tilt: "2",
		cardColor: "bg-red-400",
		src: "/1.webp",
		description: "We partner with brands to create design systems that scale. Our work includes art direction, responsive web design, and visual content that communicates what words can't.",
	},
	{
		title: "ENGINEERING",
		color: "bg-purple-300",
		tilt: "-4",
		cardColor: "bg-black",
		src: "/2.webp",
		description: "We build websites that empower founders and marketers to react quickly, test concepts, and measure results. We cut our teeth at full-stack developers on enterprise platforms and custom builds, and we apply that same discipline to low-code systems like Webflow. We specialize in large-scale migrations from WordPress to Webflow, helping organizations move past painful maintenance and Frankenstein builds to clean, modern systems.",
	},
	{
		title: "STRATEGY",
		color: "bg-teal-200",
		tilt: "2",
		cardColor: "bg-white",
		src: "/3.webp",
		description: "Our approach to strategy is precise, efficient, and grounded in expertise. We consider everything from competitive landscape and project goals to tactical plans for SEO and conversion optimization. Strategic planning sets the foundation for creative work, so we move through it quickly and deliberately. Our process eliminates the bottlenecks and endless conceptual discussions that drag out early phases and cause delays downstream.",
	},
	{
		title: "DESIGN",
		color: "bg-black",
		tilt: "-4",
		cardColor: "bg-red-400",
		src: "/4.webp",
		description: "We partner with brands to create design systems that scale. Our work includes art direction, responsive web design, and visual content that communicates what words can't.",
	},
];

export default function CardStack() {
	const sectionRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const stackCards = gsap.utils.toArray<HTMLElement>(".stack-card");

		stackCards.forEach((card, i) => {
			if (i === 0) return;

			gsap.set(card, {
				yPercent: 120,
				autoAlpha: 1,
			});
		});

		gsap.set(stackCards[0], {
			yPercent: 0,
			autoAlpha: 1,
		});

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top top",
				end: () => `+=${window.innerHeight * stackCards.length}`,
				pin: true,
				scrub: 1.5,
				anticipatePin: 1,
				invalidateOnRefresh: true,
			},
		});

		stackCards.forEach((card, i) => {
			if (i === 0) return;

			tl.to(
				card,
				{
					yPercent: 0,
					duration: 1,
					ease: "none",
				},
				">"
			);
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
						zIndex: idx,
					}}
				>
					<div className={`stack-card h-screen w-screen flex flex-col sm:flex-row items-center justify-center font-twid font-bold text-white ${card.color}`}>
						<div className="py-4 px-10 md:h-full w-full flex flex-col justify-between md:p-10">
							<div className="flex flex-col gap-4 leading-none">
								<span className="h-10 w-10 rounded-full border border-white flex items-center justify-center text-xl">{idx + 1}</span>
								<span className={`text-body-sm md:text-body-lg 2xl:text-heading-lg md:w-[40vw] font-light ${card.color == "bg-black" ? `text-white` : `text-black`}`}>{card.description}</span>
							</div>
							<span className={`text-display-md ${card.color === "bg-black" ? "text-white" : `text-black`}`}>{card.title}</span>
						</div>
						<div className="h-full w-full flex items-center justify-center md:justify-end md:pr-20">
							<TiltCard2
								className="h-[400px] w-[300px] md:h-[500px] md:w-[340px] lg:h-[600px] lg:w-[450px] xl:h-[600px] xl:w-[550px] 2xl:h-[900px] 2xl:w-[690px]"
								cardClassName={card.cardColor}
								tilt={card.tilt}
							>
								<div className="relative h-full w-full overflow-hidden">
									<Image
										src={card.src}
										alt={card.title}
										fill
										priority={idx === 0}
										loading={idx === 0 ? "eager" : undefined}
										className="object-cover"
										sizes="(max-width: 768px) 300px, (max-width: 1024px) 340px, (max-width: 1280px) 450px, (max-width: 1536px) 550px, 750px"
									/>
								</div>
							</TiltCard2>
						</div>
					</div>
				</div>
			))}
		</section>
	);
}


