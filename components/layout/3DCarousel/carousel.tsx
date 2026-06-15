"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollRevealText from "@/components/scrolltriger/fillColor";
import SlidingText from "../aboutUsButton/aboutUsButton";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "../tiltCard/tiltCard";
import { SentenceRoll } from "../navAnimation/navAnimation";
import Marquee from "@/components/marquee/marquee1";

interface OrbitBackgroundProps {
	pivotX?: string;
	pivotY?: string;
	className?: string;
}

const CARD_COUNT = 6;
const RADIUS = 420;

export function OrbitBackground({
	pivotX = "50%",
	pivotY = "50%",
	className = "",
}: OrbitBackgroundProps) {
	const orbitRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!orbitRef.current) return;

		const orbit = orbitRef.current;

		const baseTween = gsap.to(orbit, {
			rotateY: "+=360",
			duration: 40,
			ease: "none",
			repeat: -1,
			force3D: true,
		});

		const pause = () => baseTween.pause();
		const resume = () => baseTween.resume();

		orbit.addEventListener("mouseenter", pause);
		orbit.addEventListener("mouseleave", resume);

		let lastScrollY = window.scrollY;
		let scrollTimeout: ReturnType<typeof setTimeout>;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const delta = currentScrollY - lastScrollY;

			clearTimeout(scrollTimeout);

			if (delta > 0) {
				gsap.to(baseTween, {
					timeScale: 8,
					duration: 0.3,
				});
			} else if (delta < 0) {
				gsap.to(baseTween, {
					timeScale: -6,
					duration: 0.3,
				});
			}

			scrollTimeout = setTimeout(() => {
				gsap.to(baseTween, {
					timeScale: 1,
					duration: 1,
				});
			}, 120);

			lastScrollY = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			orbit.removeEventListener("mouseenter", pause);
			orbit.removeEventListener("mouseleave", resume);
			baseTween.kill();
		};
	});

	return (
		<div
			className={`absolute inset-0 overflow-visible pointer-events-none ${className}`}
			style={{
				perspective: "1800px",
			}}
		>
			<div
				ref={orbitRef}
				className="absolute"
				style={{
					left: pivotX,
					top: pivotY,
					transformStyle: "preserve-3d",
				}}
			>
				{Array.from({ length: CARD_COUNT }).map((_, index) => {
					const angle = (360 / CARD_COUNT) * index;

					return (
						<div
							key={index}
							className="absolute left-1/2 top-1/2 h-[250px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-black dark:bg-white shadow-2xl"
							style={{
								transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
							}}
						>
							<div className="flex h-full w-full items-center justify-center">
								<span className="text-6xl font-bold text-white dark:text-black">
									{index + 1}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}


gsap.registerPlugin(ScrollTrigger);

const cards = [
	{
		title: "DESIGN",
		color: "bg-black",
		tilt: "2",
		cardColor: "bg-red-400",
		description: "We partner with brands to create design systems that scale. Our work includes art direction, responsive web design, and visual content that communicates what words can't.",
	},
	{
		title: "ENGINEERING",
		color: "bg-purple-300",
		tilt: "-4",
		cardColor: "bg-black",
		description: "We build websites that empower founders and marketers to react quickly, test concepts, and measure results. We cut our teeth at full-stack developers on enterprise platforms and custom builds, and we apply that same discipline to low-code systems like Webflow. We specialize in large-scale migrations from WordPress to Webflow, helping organizations move past painful maintenance and Frankenstein builds to clean, modern systems.",
	},
	{
		title: "STRATEGY",
		color: "bg-teal-200",
		tilt: "2",
		cardColor: "bg-white",
		description: "Our approach to strategy is precise, efficient, and grounded in expertise. We consider everything from competitive landscape and project goals to tactical plans for SEO and conversion optimization. Strategic planning sets the foundation for creative work, so we move through it quickly and deliberately. Our process eliminates the bottlenecks and endless conceptual discussions that drag out early phases and cause delays downstream.",
	},
	{
		title: "DESIGN",
		color: "bg-black",
		tilt: "-4",
		cardColor: "bg-red-400",
		description: "We partner with brands to create design systems that scale. Our work includes art direction, responsive web design, and visual content that communicates what words can't.",
	},
];

export function CardStack() {
	const sectionRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
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
		},
		{ scope: sectionRef }
	);

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
						<TiltCard className={`h-[800px] w-[800px] right-20`} cardClassName={` ${card.cardColor}`} tilt={card.tilt} />
					</div>
				</div>
			))}
		</section>
	);
}



const text = "This is where we deploy our systems. Each space becomes a live environment where we test potential, apply operational expertise, and refine performance in real time. From unlocking venue potential to experimenting with new models, business architecture, and growth strategies, everything is built to drive relevance, consistency, and demand. If it doesn’t perform, it doesn’t stay.";

export default function carouselPage() {
	return (
		<div className="relative w-full font-twid" id="ai-labs">
			<section className="relative min-h-screen flex flex-col items-center justify-center gap-8 border-b border-black dark:border-zinc-600">
				<div className="absolute inset-0 pointer-events-none">
					<OrbitBackground pivotY="30%" />
				</div>

				<div className="relative z-10 w-[45vw] text-center mt-100">
					<ScrollRevealText
						text={text}
						className="text-4xl"
					/>
				</div>

				<div className="group relative z-10 w-fit h-10 px-5 border-2 rounded-xl border-black dark:border-white flex items-center justify-center overflow-hidden">
					<div className="absolute inset-0 bg-[#ff2d55] origin-bottom scale-y-0 transition-transform duration-500 ease-in-out group-hover:scale-y-100 rounded-xl" />

					<span className="relative z-10">
						<SlidingText text="INSIDE AI LABS" />
					</span>
				</div>
			</section>

			<Marquee text="@Intellectual Property"/>
			{/* STACK SECTION */}
			<CardStack />

			{/* EXTRA CONTENT AFTER STACK */}
			<section className="h-[20vh] w-full text-2xl flex items-end justify-between px-4 py-2 text-black dark:text-zinc-400 border-b border-black dark:border-zinc-600">
				<span>© Clients</span>
				<span>(CAD® — 06)</span>
				<span>Brand Partners</span>
			</section>
		</div>

	)
}