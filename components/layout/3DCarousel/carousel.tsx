"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollRevealText from "@/components/scrolltriger/fillColor";
import SlidingText from "../aboutUsButton/aboutUsButton";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "@/components/marquee/marquee1";
import CardStack from "../cardStack/cardStack";
import BottomDesc from "../bottomDesc/bottomDesc";
import Image from "next/image";
import Reveal from "@/components/marquee/reveal";

gsap.registerPlugin(ScrollTrigger);

interface OrbitBackgroundProps {
	pivotX?: string;
	pivotY?: string;
	className?: string;
}

const CARD_COUNT = 6;

const ORBIT_IMAGES = [
	"/1.png",
	"/2.png",
	"/3.png",
	"/4.png",
	"/5.png",
	"/6.png",
];

const getRadius = (width: number) => {
	// Small phones
	if (width < 375) return 90;
	// Large phones
	if (width < 480) return 150;
	// Landscape phones / small tablets
	if (width < 640) return 130;
	// Tablets
	if (width < 768) return 150;
	// Large tablets
	if (width < 1024) return 290;
	// Small laptops
	if (width < 1280) return 400;
	// Large laptops
	if (width < 1536) return 380;
	// Ultra-wide desktops
	return 420;
};

export function OrbitBackground({
	pivotX = "50%",
	pivotY = "50%",
	className = "",
}: OrbitBackgroundProps) {
	const orbitRef = useRef<HTMLDivElement>(null);
	const [radius, setRadius] = useState(420);

	useEffect(() => {
		const updateRadius = () => {
			setRadius(getRadius(window.innerWidth));
		};

		updateRadius();
		window.addEventListener("resize", updateRadius);

		return () => {
			window.removeEventListener("resize", updateRadius);
		};
	}, []);

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
	}, { dependencies: [] });

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
							className="absolute left-1/2 top-1/2 h-[110px] w-[170px] sm:h-[120px] sm:w-[200px] md:h-[180px] md:w-[280px] lg:h-[250px] lg:w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-black dark:bg-white shadow-2xl"
							style={{
								transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
							}}
						>
							<div className="flex h-full w-full items-center justify-center">
								<div className="relative h-full w-full">
									<Image
										src={ORBIT_IMAGES[index]}
										alt="NAH"
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
									/>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}


const text = "This is where we deploy our systems. Each space becomes a live environment where we test potential, apply operational expertise, and refine performance in real time. From unlocking venue potential to experimenting with new models, business architecture, and growth strategies, everything is built to drive relevance, consistency, and demand. If it doesn’t perform, it doesn’t stay.";

export default function carouselPage() {
	return (
		<div className="relative w-full font-twid border border-zinc-100 dark:border-zinc-900" >
			<section className="relative min-h-[80vh] lg:min-h-screen flex flex-col items-center justify-center gap-6 lg:gap-8 border-b border-zinc-100 dark:border-zinc-900">
				<div className="absolute inset-0 pointer-events-none">
					<OrbitBackground pivotY="30%" />
				</div>

				<div className="relative z-10 w-[90vw] md:w-[70vw] lg:w-[45vw] text-center mt-70 md:mt-55 lg:mt-100">
					<ScrollRevealText
						text={text}
						className="text-heading-lg"
					/>
				</div>
			</section>

			<Reveal>
				<Marquee text="@Intellectual Property" />
			</Reveal>

			{/* STACK SECTION */}
			<CardStack />

			<BottomDesc text1="© Clients" text2="(CAD® — 06)" text3="Brand Partners" className="text-black dark:text-zinc-400" />
		</div>

	)
}