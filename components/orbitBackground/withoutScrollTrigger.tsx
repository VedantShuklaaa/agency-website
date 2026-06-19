"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface OrbitBackgroundProps {
	pivotX?: string;
	pivotY?: string;
	className?: string;
}

const CARD_COUNT = 8;

const ORBIT_IMAGES = [
	"/1.png",
	"/2.png",
	"/3.png",
	"/4.png",
	"/5.png",
	"/6.png",
	"/6.png",
	"/6.png",
];

const getRadius = (width: number) => {
	if (width < 375) return 120;
	if (width < 480) return 170;
	if (width < 640) return 220;
	if (width < 768) return 280;
	if (width < 1024) return 340;
	if (width < 1280) return 520;
	if (width < 1536) return 600;
	return 480;
};

export function OrbitBackground({
	pivotX = "50%",
	pivotY = "50%",
	className = "",
}: OrbitBackgroundProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<HTMLDivElement[]>([]);
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
			rotateY: "-=360",
			duration: 40,
			ease: "none",
			repeat: -1,
			force3D: true,
		});

		const introTween = gsap.fromTo(
			cardRefs.current,
			{
				opacity: 0,
				y: (index) => (index % 2 === 0 ? -180 : 180),
				scale: 0.92,
			},
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 1.1,
				ease: "power3.out",
				stagger: 0.12,
				force3D: true,
				paused: true,
			}
		);

		ScrollTrigger.create({
			trigger: containerRef.current,
			start: "top 80%",
			once: true,
			onEnter: () => introTween.play(),
		});

		const pause = () => baseTween.pause();
		const resume = () => baseTween.resume();

		orbit.addEventListener("mouseenter", pause);
		orbit.addEventListener("mouseleave", resume);

		return () => {
			orbit.removeEventListener("mouseenter", pause);
			orbit.removeEventListener("mouseleave", resume);
			baseTween.kill();
			introTween.kill();
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, { dependencies: [] });


	return (
		<div
			ref={containerRef}
			className={`absolute inset-0 overflow-visible pointer-events-none ${className}`}
			style={{
				perspective: "2000px",
			}}
		>
			<div
				ref={orbitRef}
				className="absolute"
				style={{
					left: pivotX,
					top: pivotY,
					transformStyle: "preserve-3d",
					transform: "rotateZ(10deg)",
				}}
			>
				{Array.from({ length: CARD_COUNT }).map((_, index) => {
					const angle = (360 / CARD_COUNT) * index;
					const yOffset = index % 2 === 0 ? -30 : 30;

					return (
						<div
							key={index}
							className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "
							style={{
								transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(${yOffset}px)`,
								transformStyle: "preserve-3d",
							}}
						>
							<div
								ref={(el) => {
									if (el) cardRefs.current[index] = el;
								}}
								style={{
									transform: `rotateZ(-5deg) rotateX(-4deg)`,
									transformStyle: "preserve-3d",
								}}
							>
								<div className="relative h-[110px] w-[140px] overflow-hidden rounded-3xl shadow-2xl sm:h-[120px] sm:w-[200px] md:h-[180px] md:w-[250px] lg:h-[280px] lg:w-[300px] bg-linear-to-t from-white via-purple-300 to-[#938ACF]">
									{/*<Image
										src={ORBIT_IMAGES[index]}
										alt="NAH"
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
									/>*/}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}