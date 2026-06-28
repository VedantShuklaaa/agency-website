"use client";

import Image from "next/image";
import FloatingCard from "../layout/floatingCard/floatingCard";
import { useRef } from "react";
import ScrollRevealText from "../scrolltriger/fillColor";
import SlidingText from "../layout/aboutUsButton/aboutUsButton";
import TransitionLink from "../layout/pageTransition/transitionLink";

const text = "We are India's First Nightlife & Entertainment Architects. We design operating systems that make venues culturally relevant, community-led, and consistently engaging. WILDBOYS TRIBE was built on the belief that the future of nightlife and entertainment will not be shaped by isolated activities, but by integrated systems capable of aligning culture, community, experiences, operations, partnerships, and growth into a single force.";

export default function FloatCard() {
	return (
		<div className="relative h-[120vh] w-full font-twid hidden lg:flex flex-col lg:flex-row items-center justify-center bg-background border-b border-zinc-100 dark:border-zinc-900">
			<div className="h-full w-full flex flex-col z-99">
				<div className="h-[60%] w-full flex items-center justify-center leading-tight">
					<ScrollRevealText text={text} className="max-w-[50vw] text-heading-xl " />
				</div>
				<div className="h-[40%] w-full flex">
					<div className="h-full w-full" />
					<div className="h-full w-full flex flex-col justify-center gap-2">
						<p className="max-w-[90%] text-heading-lg">
							Our ambition extends beyond improving individual venues.
							We exist to reshape the industry by architecting the operating systems, supporting infrastructure, and strategic foundations
							that enable businesses to create meaningful experiences,
							build loyal communities, and remain relevant for years—not seasons.
							From nightlife venues and hospitality brands to entertainment properties and cultural ventures, we transform ideas into ecosystems, spaces into destinations, and ambition into enduring businesses.
						</p>

						<TransitionLink className="group relative w-fit h-10 px-5 border-2 rounded-xl border-zinc-100 dark:border-white flex items-center justify-center overflow-hidden" href="/work">
							<div className="absolute inset-0 bg-[#FF0000] origin-bottom scale-y-0 transition-transform duration-500 ease-in-out group-hover:scale-y-100 rounded-xl" />
							<span className="relative z-10">
								<SlidingText text="VIEW WORK" />
							</span>
						</TransitionLink>
					</div>
				</div>
			</div>

			<div className="absolute h-full w-full">
				<FloatingCard
					y={100}
					className="absolute top-20 right-50"
				>
					<TiltImage
						src="/1.webp"
						alt="Nightlife venue"
						sizes="320px"
						className="w-[420px] h-[680px]"
					/>
				</FloatingCard>

				<FloatingCard
					y={100}
					className="absolute bottom-50 left-50"
				>
					<TiltImage
						src="/2.webp"
						alt="Nightlife crowd"
						sizes="500px"
						className="w-[420px] h-[680px]"
					/>
				</FloatingCard>
			</div>
		</div>
	);
}

interface TiltImageProps {
	src: string;
	alt: string;
	sizes: string;
	className?: string;
}

function TiltImage({
	src,
	alt,
	sizes,
	className = "",
}: TiltImageProps) {
	const cardRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (
		e: React.MouseEvent<HTMLDivElement>
	) => {
		const card = cardRef.current;
		if (!card) return;

		const rect = card.getBoundingClientRect();

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX =
			((y - centerY) / centerY) * -12;

		const rotateY =
			((x - centerX) / centerX) * 12;

		card.style.transform = `
			perspective(800px)
			rotateX(${rotateX}deg)
			rotateY(${rotateY}deg)
			scale3d(1.02,1.02,1.02)
		`;
	};

	const handleMouseLeave = () => {
		if (!cardRef.current) return;

		cardRef.current.style.transform = `
			perspective(800px)
			rotateX(0deg)
			rotateY(0deg)
			scale3d(1,1,1)
		`;
	};

	return (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				transition: "transform 0.15s ease-out",
			}}
			className={`relative overflow-hidden rounded-[10px] ${className}`}
		>
			<Image
				src={src}
				alt={alt}
				fill
				className="object-cover"
				sizes={sizes}
			/>
		</div>
	);
}