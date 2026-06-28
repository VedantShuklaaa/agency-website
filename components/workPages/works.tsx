"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { projects } from "@/lib/constants";
import TransitionLink from "../layout/pageTransition/transitionLink";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
	const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			cardsRef.current.forEach((card) => {
				if (!card) return;

				gsap.fromTo(
					card,
					{
						opacity: 0,
						scale: 0.96,
						y: 56,
					},
					{
						opacity: 1,
						scale: 1,
						y: 0,
						duration: 0.95,
						ease: "power3.out",
						scrollTrigger: {
							trigger: card,
							start: "top 85%",
							toggleActions: "play none none reverse",
						},
					}
				);
			});
		},
		{ scope: containerRef }
	);

	return (
		<section
			ref={containerRef}
			className="flex w-full flex-col gap-8 p-4 font-twid md:gap-10 md:p-6"
		>
			{projects.map((item, idx) => {
				const isReverse = idx % 2 !== 0;

				return (
					< TransitionLink key={item.slug} href={`/work/${item.slug}`} className="block">
						<div
							ref={(el) => {
								cardsRef.current[idx] = el;
							}}
							className={`group relative flex min-h-[320px] w-full flex-col overflow-hidden border border-zinc-200 bg-white/40 transition-all duration-500 ease-out
								hover:-translate-y-1 hover:border-[#FF0000]/70 hover:shadow-[0_0_0_1px_rgba(255,45,85,0.15),0_24px_80px_rgba(255,45,85,0.18)]
								dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:border-[#FF0000]/60 dark:hover:shadow-[0_0_0_1px_rgba(255,45,85,0.2),0_24px_80px_rgba(255,45,85,0.2)]
								lg:min-h-[520px] ${isReverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}
						>
							{/* Image */}
							<div className="relative w-full aspect-[16/10] overflow-hidden lg:w-[42%] lg:aspect-auto xl:w-[38%]">
								<Image
									src={item.src}
									alt={item.title}
									fill
									className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
									sizes="(max-width: 1024px) 100vw, 40vw"
								/>
							</div>

							{/* Content */}
							<div className="flex w-full flex-col justify-between gap-8 p-6 md:p-8 lg:w-[58%] lg:p-10 xl:w-[62%] xl:p-12">
								<div className="flex flex-col gap-4">
									<span className="text-xs uppercase tracking-[0.2em] text-zinc-400">
										Selected Work
									</span>

									<div className="flex-1">
										<h2 className="text-3xl leading-none sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
											{item.title}
										</h2>
									</div>
								</div>

								<div className="flex max-w-4xl flex-col gap-3">
									<span className="text-base sm:text-lg md:text-xl">
										{item.description}
									</span>

									<p className="max-w-4xl text-sm leading-6 text-zinc-500 md:text-base">
										{item.smallDescription}
									</p>

									<span className="text-sm text-black dark:text-zinc-400 md:text-base">
										{item.location}
									</span>
								</div>
							</div>
						</div>
					</ TransitionLink>
				);
			})}
		</section>
	);
}