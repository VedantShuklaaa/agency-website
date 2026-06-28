"use client";
import Image from "next/image";
import { TiltCard2 } from "../layout/tiltCard/tiltCard";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FRONT_IMAGES = ["/1.webp", "/2.webp", "/3.webp", "/4.webp", "/5.webp"];

export default function Hero() {
	const containerRef = useRef<HTMLDivElement>(null);
	const frontCardRef = useRef<HTMLDivElement>(null);
	const backCardRef = useRef<HTMLDivElement>(null);
	const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
	const currentIndexRef = useRef(0);
	const activeTimeline = useRef<gsap.core.Timeline | null>(null);
	const isUnmounted = useRef(false);

	useGSAP(
		() => {
			isUnmounted.current = false;

			const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];
			if (!images.length) return;

			gsap.set(images, {
				xPercent: 0,
				yPercent: 0,
				rotate: 0,
				opacity: 0,
				zIndex: 0,
			});

			gsap.set(images[0], { opacity: 1, zIndex: 2 });

			gsap.fromTo(
				[backCardRef.current, frontCardRef.current],
				{ scale: 0, opacity: 0, y: 80, rotate: 6 },
				{ scale: 1, opacity: 1, y: 0, rotate: 0, duration: 1.1, stagger: 0.14, ease: "power4.out" }
			);

			const directions = [
				{ xPercent: 110, yPercent: 0, rotate: 8 },
				{ xPercent: -110, yPercent: 0, rotate: -8 },
				{ xPercent: 0, yPercent: -115, rotate: 6 },
				{ xPercent: 0, yPercent: 115, rotate: -6 },
			];

			const runTransition = () => {
				if (isUnmounted.current) return; // stop if unmounted

				const currentIndex = currentIndexRef.current;
				const nextIndex = (currentIndex + 1) % images.length;
				const current = images[currentIndex];
				const next = images[nextIndex];
				const dir = directions[Math.floor(Math.random() * directions.length)];
				const delay = gsap.utils.random(1.6, 3.4);

				gsap.set(next, { opacity: 1, xPercent: 0, yPercent: 0, rotate: 0, zIndex: 1 });
				gsap.set(current, { zIndex: 2 });

				const tl = gsap.timeline({
					delay,
					onComplete: () => {
						if (isUnmounted.current) return;

						gsap.set(current, { opacity: 0, xPercent: 0, yPercent: 0, rotate: 0, zIndex: 0 });
						gsap.set(next, { opacity: 1, zIndex: 2 });

						currentIndexRef.current = nextIndex;
						runTransition();
					},
				});

				activeTimeline.current = tl;

				tl.to(current, {
					xPercent: dir.xPercent,
					yPercent: dir.yPercent,
					rotate: dir.rotate,
					duration: 0.9,
					ease: "power3.inOut",
				});
			};

			runTransition();

			return () => {
				isUnmounted.current = true;
				activeTimeline.current?.kill();
			};
		},
		{ scope: containerRef }
	);

	return (
		<div
			ref={containerRef} // ← was missing before
			className="h-screen w-full flex flex-col lg:flex-row items-center justify-center relative leading-none"
		>
			<div className="lg:h-full w-full flex flex-col items-center lg:items-start justify-center lg:justify-start z-30 py-5 lg:px-10 lg:py-20">
				<span>
					<p className="text-display-md md:text-display-lg lg:text-display-md font-anton z-30 flex">SYSTEMS IN ACTION</p>
				</span>
				<span className="text-center lg:text-start 2xl:w-[30vw] font-anton">
					<p className="text-heading-md md:text-heading-lg text-zinc-400">This is where philosophy becomes execution. Every project is another proof that great destinations are built through systems—not chance. </p>
				</span>
			</div>

			<div className="h-full w-full flex items-center justify-center">
				<div className="grid place-items-center">
					<motion.div
						ref={frontCardRef}
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
						className="col-start-1 row-start-1 z-10 relative"
					>
						<TiltCard2 tilt="-2" className="relative h-[500px] w-[350px] overflow-hidden 2xl:h-[900px] 2xl:w-[700px]">
							{FRONT_IMAGES.map((src, i) => (
								<div
									key={src}
									ref={(el) => { imageRefs.current[i] = el; }}
									className="absolute inset-0"
								>
									<Image
										src={src}
										alt={`Front Card ${i + 1}`}
										fill
										priority={i === 0}
										sizes="(max-width: 1536px) 350px, 700px"
										className="pointer-events-none object-cover"
									/>
								</div>
							))}
						</TiltCard2>
					</motion.div>

					<motion.div
						ref={backCardRef}
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
						className="col-start-1 row-start-1 relative"
					>
						<TiltCard2 tilt="2" className="h-[500px] w-[350px] 2xl:h-[900px] 2xl:w-[700px]">
							<Image
								src="/2.webp"
								alt="Back Card"
								fill
								priority
								sizes="(max-width: 1536px) 350px, 700px"
								className="object-cover pointer-events-none"
							/>
						</TiltCard2>
					</motion.div>
				</div>
			</div>
		</div>
	);
}