"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import TransitionLink from "../layout/pageTransition/transitionLink";
import HoverRevealCard from "./projectRevealCard";

gsap.registerPlugin(ScrollTrigger);

const projects = [
	{ title: "Groww", description: "Launch Video Campaign", src: "/1.webp", srcReveal: "/1.webp" },
	{ title: "Cult", description: "Smartwatch Launch Video", src: "/2.webp", srcReveal: "/2.webp" },
	{ title: "Arovalis", description: "Brand Identity Design", src: "/3.webp", srcReveal: "/3.webp" },
	{ title: "Pure Project", description: "Brand Identity & Packaging Design", src: "/4.webp", srcReveal: "/4.webp" },
	{ title: "Slice", description: "Feature Launch Commercial", src: "/5.webp", srcReveal: "/5.webp" },
	{ title: "MadDrop", description: "Website Design & Development", src: "/6.webp", srcReveal: "/6.webp" },
];

export default function Projects() {
	useGSAP(() => {
		gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
			gsap.fromTo(
				card,
				{ scale: 0.75 },
				{
					scale: 1,
					ease: "none",
					scrollTrigger: {
						trigger: card,
						start: "top 90%",
						end: "top 20%",
						scrub: 1,
					},
				}
			);
		});
	}, { dependencies: [] });

	return (
		<div id="work">
			<div className="grid grid-cols-1 lg:grid-cols-2 font-onest font-light border-t border-zinc-100 dark:border-zinc-900">
				{projects.map((project, idx) => (
					<TransitionLink
						href={`/work/${project.title.toLocaleLowerCase()}`}
						key={project.title}
						className={`border-b border-zinc-100 transition-all duration-500 hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-950 ${idx % 2 === 1 ? "lg:border-l lg:border-zinc-100 lg:dark:border-zinc-900" : ""}`}
					>
						<div className="flex flex-col justify-center gap-2 px-4 md:px-6 lg:px-10 py-6">
							<span className="text-display-sm">{project.title}</span>
							<span className="text-heading-lg">{project.description}</span>
						</div>

						<div className="flex items-center justify-center px-4 md:px-6 pb-6">
							<div className="project-card relative aspect-[16/10] w-full overflow-hidden rounded-[10px]">
								<HoverRevealCard
									topSrc={project.src}
									underSrc={project.srcReveal}
									alt={project.title}
									priority={idx === 0}
								/>
							</div>
						</div>
					</TransitionLink>
				))}
			</div>

			{/* Bottom Grid — same pattern, ProjectRevealOverlay dropped into each .project-card */}
			<div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr] border-b border-zinc-100 dark:border-zinc-900">
				<TransitionLink href="/work/bloc" className="lg:border-r border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-950 duration-500 transition-all">
					<div className="flex flex-col justify-center gap-2 px-4 md:px-6 lg:px-10 py-6">
						<span className="text-display-sm">Bloc</span>
						<span className="text-heading-lg">Brand Identity, Product Design</span>
					</div>
					<div className="flex items-center justify-center px-4 md:px-6 pb-6">
						<div className="project-card relative aspect-[16/10] w-full overflow-hidden rounded-[10px] group">
							<Image
								src="/AQUA_RUMBLE.webp"
								alt="NAH"
								fill
								className="object-cover transition-transform duration-700 group-hover:scale-105"
								sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
							/>
						</div>
					</div>
				</TransitionLink>

				<TransitionLink href="/work/redmi" className="lg:border-r border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-950 duration-500 transition-all">
					<div className="flex flex-col justify-center gap-2 px-4 md:px-6 lg:px-10 py-6">
						<span className="text-display-sm">Redmi 11S</span>
						<span className="text-heading-lg">Product Launch Video</span>
					</div>
					<div className="flex items-center justify-center px-4 md:px-6 pb-6">
						<div className="project-card relative aspect-[16/10] w-full overflow-hidden rounded-[10px] group">
							<Image
								src="/KITTY&CHAOS.webp"
								alt="NAH"
								fill
								className="object-cover transition-transform duration-700 group-hover:scale-105"
								sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
							/>
						</div>
					</div>
				</TransitionLink>

				<div className="p-4 group overflow-hidden min-h-[250px] lg:min-h-0">
					<TransitionLink href="/work" className="h-full min-h-[250px] lg:min-h-full w-full bg-[#ff2d55] rounded-[10px] transition-all cursor-pointer duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.1] group-hover:rounded-none flex items-center justify-center">
						<span className="text-xl md:text-2xl lg:text-3xl text-black text-center px-4">
							View All Projects
						</span>
					</TransitionLink>
				</div>
			</div>
		</div>
	);
}