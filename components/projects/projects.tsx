"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
	{
		title: "Groww",
		description: "Launch Video Campaign",
		src: "/1.png"
	},
	{
		title: "Cult",
		description: "Smartwatch Launch Video",
		src: "/2.png"
	},
	{
		title: "Arovalis",
		description: "Brand Identity Design",
		src: "/3.png"
	},
	{
		title: "Pure Project",
		description: "Brand Identity & Packaging Design",
		src: "/4.png"
	},
	{
		title: "Slice",
		description: "Feature Launch Commercial",
		src: "/5.png"
	},
	{
		title: "MadDrop",
		description: "Website Design & Development",
		src: "/6.png"
	},
];


export default function Projects() {
	useGSAP(() => {
		gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
			gsap.fromTo(
				card,
				{
					scale: 0.75,
				},
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
			{/* Main Projects Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 font-onest font-light border-t border-zinc-100 dark:border-zinc-900">
				{projects.map((project, index) => (
					<div
						key={project.title}
						className={`border-b border-zinc-100 dark:border-zinc-900 lg:min-h-[80vh] ${index % 2 === 1 ? "lg:border-l lg:border-zinc-100 lg:dark:border-zinc-900" : ""}`}
					>
						<div className="flex flex-col justify-center gap-2 px-4 md:px-6 lg:px-10 py-6">
							<span className="text-display-sm">
								{project.title}
							</span>

							<span className="text-heading-lg">
								{project.description}
							</span>
						</div>

						<div className="flex items-center justify-center px-4 md:px-6 pb-6">
							<div className="project-card relative aspect-[16/10] w-full overflow-hidden rounded-xl group">
								<Image
									src={project.src}
									alt={project.title}
									fill
									priority={index === 0}
									className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
									sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
								/>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Bottom Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr] border-b border-zinc-100 dark:border-zinc-900">

				{/* Bloc */}
				<div className="lg:border-r border-zinc-100 dark:border-zinc-900">
					<div className="flex flex-col justify-center gap-2 px-4 md:px-6 lg:px-10 py-6">
						<span className="text-display-sm">
							Bloc
						</span>

						<span className="text-heading-lg">
							Brand Identity, Product Design
						</span>
					</div>

					<div className="flex items-center justify-center px-4 md:px-6 pb-6">
						<div className="project-card relative aspect-[16/10] w-full overflow-hidden rounded-xl group">
							<Image
								src="/AQUA_RUMBLE.png"
								alt="NAH"
								fill
								className="object-cover transition-transform duration-700 group-hover:scale-105"
								sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
							/>
						</div>
					</div>
				</div>

				{/* Redmi */}
				<div className="lg:border-r border-zinc-100 dark:border-zinc-900">
					<div className="flex flex-col justify-center gap-2 px-4 md:px-6 lg:px-10 py-6">
						<span className="text-display-sm">
							Redmi 11S
						</span>

						<span className="text-heading-lg">
							Product Launch Video
						</span>
					</div>

					<div className="flex items-center justify-center px-4 md:px-6 pb-6">
						<div className="project-card relative aspect-[16/10] w-full overflow-hidden rounded-xl group">
							<Image
								src="/KITTY&CHAOS.png"
								alt="NAH"
								fill
								className="object-cover transition-transform duration-700 group-hover:scale-105"
								sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
							/>
						</div>
					</div>
				</div>

				{/* CTA */}
				<div className="p-4 group overflow-hidden min-h-[250px] lg:min-h-0">
					<div className="h-full min-h-[250px] lg:min-h-full w-full bg-[#ff2d55] rounded-xl transition-all cursor-pointer duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.1] group-hover:rounded-none flex items-center justify-center">
						<span className="text-xl md:text-2xl lg:text-3xl text-black text-center px-4">
							View All Projects
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}