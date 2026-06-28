import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface OrbitBackgroundProps {
	pivotX?: string;
	pivotY?: string;
	className?: string;
}

const CARD_COUNT = 6;

const ORBIT_IMAGES = [
	"/1.webp",
	"/2.webp",
	"/3.webp",
	"/4.webp",
	"/5.webp",
	"/6.webp",
];

const getRadius = (width: number) => {
	if (width < 375) return 90;
	if (width < 480) return 150;
	if (width < 640) return 130;
	if (width < 768) return 150;
	if (width < 1024) return 290;
	if (width < 1280) return 400;
	if (width < 1536) return 380;
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
										loading="lazy"
										fill
										className="object-cover  rounded-[10px]"
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
