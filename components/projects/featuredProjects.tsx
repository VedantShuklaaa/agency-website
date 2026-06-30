"use client";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const projects = [
	{ title: "Vibrant", src: "/1.webp" },
	{ title: "Just Salad", src: "/2.webp" },
	{ title: "Epbright", src: "/3.webp" },
	{ title: "PBS", src: "/4.webp" },
	{ title: "Titan", src: "/5.webp" },
	{ title: "Betterment", src: "/6.webp" },
];

export default function FeaturedProjects() {
	const router = useRouter()
	const [hovered, setHovered] = useState<string | null>(null);

	return (
		<section className="relative min-h-screen w-full overflow-hidden border-b border-zinc-100 dark:border-zinc-900 ">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:justify-between p-4 gap-6">
				<div className="leading-none z-50">
					<h1 className="font-anton text-display-md uppercase">
						Great experiences are never forgotten.
					</h1>
				</div>

				<div className=" z-50">
					<button className="group flex items-center gap-3 border border-white px-4 py-2 lg:px-6 lg:py-3 text-white" onClick={() => { router.push("/work") }}>
						<span className="font-twid italic uppercase text-sm lg:text-base text-[#FF0000]">
							View All Projects
						</span>

						<ArrowUpRight
							size={16}
							className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#FF0000]"
						/>
					</button>
				</div>
			</div>

			{/* Mobile Layout */}
			<div className="lg:hidden pt-32 pb-10">
				<div className="flex gap-4 overflow-x-auto px-4 snap-x snap-mandatory">
					{projects.map((project) => (
						<div
							key={project.title}
							className="relative shrink-0 w-[280px] h-[400px] snap-center rounded-xl overflow-hidden group"
						>
							<Image
								src={project.src}
								alt={project.title}
								fill
								className="object-cover transition-transform duration-700 group-hover:scale-105"
							/>

							<div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-sm">
								<span className="text-white font-twid text-xl">
									{project.title}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Desktop Layout */}
			<div className="hidden lg:grid grid-cols-3 justify-items-center items-center gap-8 px-10 ">
				{projects.map((project, idx) => (
					<motion.div
						key={project.title}
						className="relative w-[570px] h-[440px] overflow-hidden group shadow-lg shadow-zinc-300/50 dark:shadow-black/60"
						onMouseEnter={() => setHovered(project.title)}
						onMouseLeave={() => setHovered(null)}
						initial={{ opacity: 0, y: 60 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.01 }}
						animate={{
							scale:
								hovered === null
									? 1
									: hovered === project.title
										? 1.1
										: 0.9,
						}}
					>
						<Image
							src={project.src}
							alt={project.title}
							fill
							className="object-cover"
						/>

						<motion.div
							className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-sm"
							initial={{ opacity: 0, y: 20 }}
							animate={{
								opacity: hovered === project.title ? 1 : 0,
								y: hovered === project.title ? 0 : 20,
							}}
							transition={{ duration: 0.3, ease: "easeOut" }}
						>
							<span className="text-white font-twid text-xl">
								{project.title}
							</span>
						</motion.div>
					</motion.div>
				))}
			</div>
		</section>
	);
}