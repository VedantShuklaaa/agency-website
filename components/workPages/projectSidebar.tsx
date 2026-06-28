"use client";
import { useRef } from "react";
//import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ProjectSidebarSectionProps {
	project: {
		title: string;
		description: string;
		src: string;
		year?: string;
		location?: string;
		smallDescription?: string;
	};
}

export default function ProjectSidebarSection({ project }: ProjectSidebarSectionProps) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add("(min-width: 1024px)", () => {
				const st = ScrollTrigger.create({
					trigger: sectionRef.current,
					start: "top top",
					end: "bottom bottom",
					pin: sidebarRef.current,
					pinSpacing: false,
				});

				return () => st.kill();
			});

			return () => mm.kill();
		},
		{ scope: sectionRef }
	);

	return (
		<section ref={sectionRef} className="w-full border-b border-zinc-100 dark:border-zinc-900">
			<div className="flex w-full flex-col lg:flex-row">
				<aside
					ref={sidebarRef}
					className="w-full shrink-0 border-b border-zinc-100 dark:border-zinc-900 lg:h-screen lg:w-[32%] lg:border-b-0 lg:border-r"
				>
					<div className="mx-auto flex h-full max-w-4xl flex-col justify-between gap-10 px-4 py-8 lg:px-8 lg:py-10">
						<div className="flex flex-col gap-6">
							<span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
								Selected Work
							</span>

							<div className="flex flex-col gap-3">
								<h1 className="text-3xl leading-none sm:text-4xl md:text-5xl">
									{project.title}
								</h1>

								<p className="text-base text-zinc-700 dark:text-zinc-300 md:text-lg">
									{project.description}
								</p>

								{project.smallDescription && (
									<p className="text-sm leading-7 text-zinc-500 dark:text-zinc-400">
										{project.smallDescription}
									</p>
								)}
							</div>
						</div>

						<div className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-zinc-100 pt-6 dark:border-zinc-900">
							<div className="flex flex-col gap-1">
								<span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
									Client
								</span>
								<span className="text-sm md:text-base">{project.title}</span>
							</div>

							<div className="flex flex-col gap-1">
								<span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
									Location
								</span>
								<span className="text-sm md:text-base">
									{project.location ?? "Bengaluru, India"}
								</span>
							</div>

							<div className="flex flex-col gap-1">
								<span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
									Scope
								</span>
								<span className="text-sm md:text-base">{project.description}</span>
							</div>

							<div className="flex flex-col gap-1">
								<span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
									Year
								</span>
								<span className="text-sm md:text-base">{project.year ?? "2026"}</span>
							</div>
						</div>
					</div>
				</aside>

				<div className="flex w-full flex-col gap-4 p-4 md:gap-6 md:p-6 lg:p-8">
					<div className="grid min-h-[40vh] w-full gap-4 md:grid-cols-2 md:min-h-[50vh] lg:grid-cols-3 lg:min-h-[60vh]">
						<div className="relative h-full w-full overflow-hidden border border-zinc-100 dark:border-zinc-900" />
						<div className="relative h-full w-full overflow-hidden border border-zinc-100 dark:border-zinc-900" />
						<div className="relative h-full w-full overflow-hidden border border-zinc-100 dark:border-zinc-900" />
					</div>

					<div className="relative min-h-[60vh] w-full sm:min-h-[75vh] lg:min-h-[60vh] lg:h-[60vh] border">
						{/*<Image
							src={project.src}
							alt={`${project.title} showcase 2`}
							fill
							className="rounded-xl object-cover"
							sizes="(max-width: 1024px) 100vw, 68vw"
						/>*/}
					</div>

					<div className="relative min-h-[60vh] w-full sm:min-h-[75vh] lg:min-h-[60vh] lg:h-[60vh] border">
						{/*<Image
							src={project.src}
							alt={`${project.title} showcase 3`}
							fill
							className="rounded-xl object-cover"
							sizes="(max-width: 1024px) 100vw, 68vw"
						/>*/}
					</div>
				</div>
			</div>
		</section>
	);
}