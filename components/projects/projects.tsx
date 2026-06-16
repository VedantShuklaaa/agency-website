"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
	{
		title: "Groww",
		description: "Launch Video Campaign",
	},
	{
		title: "Cult",
		description: "Smartwatch Launch Video",
	},
	{
		title: "Arovalis",
		description: "Brand Identity Design",
	},
	{
		title: "Pure Project",
		description: "Brand Identity & Packaging Design",
	},
	{
		title: "Slice",
		description: "Feature Launch Commercial",
	},
	{
		title: "MadDrop",
		description: "Website Design & Development",
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
		<div>
			<div className="grid grid-cols-2 grid-rows-3 h-[240vh] font-onest font-light border-t border-black dark:border-zinc-900" id="work">
				{projects.map((project, index) => (
					<div
						key={project.title}
						className={`${index % 2 === 1 ? "border-l" : ""} ${index < projects.length - 2 ? "border-b" : ""}`}
					>
						<div className="h-[25%] w-full flex flex-col justify-center gap-2 px-10">
							<span className="text-5xl">{project.title}</span>
							<span className="text-xl">{project.description}</span>
						</div>

						<div className="h-[75%] w-full flex items-center justify-center py-4 px-6">
							<div className="project-card h-full w-full bg-black dark:bg-white rounded-xl" />
						</div>
					</div>
				))}
			</div>

			<div className="grid grid-cols-[2fr_2fr_1fr] h-[70vh] w-full font-onest border-b border-black dark:border-zinc-600">
				<div className="border-r border-black dark:border-zinc-600">
					<div className="h-[25%] w-full flex flex-col justify-center gap-2 px-10">
						<span className="text-5xl">Bloc</span>
						<span className="text-xl">Brand Identity, Product Design</span>
					</div>

					<div className="h-[75%] w-full flex items-center justify-center py-4 px-6">
						<div className="project-card h-full w-full bg-black dark:bg-white rounded-xl" />
					</div>
				</div>

				<div className="border-r border-black dark:border-zinc-600">
					<div className="h-[25%] w-full flex flex-col justify-center gap-2 px-10">
						<span className="text-5xl">Redmi 11S</span>
						<span className="text-xl">Product Launch Video</span>
					</div>

					<div className="h-[75%] w-full flex items-center justify-center py-4 px-6">
						<div className="project-card h-full w-full bg-black dark:bg-white rounded-xl" />
					</div>
				</div>

				<div className="p-4 group overflow-hidden">
					<div className=" h-full w-full bg-[#ff2d55] rounded-xl transition-all cursor-pointer duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.1] group-hover:rounded-none flex items-center justify-center">
						<span className="text-black text-3xl">View All Projects</span>
					</div>
				</div>
			</div>
		</div>
	)
}