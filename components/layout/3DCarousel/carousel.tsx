"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollRevealText from "@/components/scrolltriger/fillColor";
import SlidingText from "../aboutUsButton/aboutUsButton";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
		title: "Card One",
		color: "bg-white",
	},
	{
		title: "Card Two",
		color: "bg-black",
	},
	{
		title: "Card Three",
		color: "bg-purple-200",
	},
	{
		title: "Card Four",
		color: "bg-teal-200",
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
			{cards.map((card, index) => (
				<div
					key={index}
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
					style={{
						zIndex: index - 1,
					}}
				>
					<div
						className={`stack-card h-screen w-[70vw] flex items-center justify-center text-6xl font-bold text-white ${card.color}`}
					>
						{card.title}
					</div>
				</div>
			))}
		</section>
	);
}



const text = "Our Lab is where we explore AI-driven workflows, emerging tools, and modern creative production methods. From testing AI video ads and content systems to experimenting with new design and development approaches, this is where ideas are validated before being applied to real client work.";

export default function carouselPage() {
	return (
		<div className="relative w-full font-twid" id="ai-labs">

			{/* HERO */}
			<section className="relative min-h-screen flex flex-col items-center justify-center gap-8">

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