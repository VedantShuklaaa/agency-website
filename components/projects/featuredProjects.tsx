"use client";
import TiltCard from "@/components/layout/tiltCard/tiltCard";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const projects = [
	{ title: "Vibrant", tilt: -20, x: -390, y: 10, z: 10, color: "#d8cdb5", src: "/1.png" },
	{ title: "Just Salad", tilt: -10, x: -260, y: -50, z: 20, color: "#7ca4ff", src: "/2.png" },
	{ title: "Epbright", tilt: -2, x: -90, y: -100, z: 30, color: "#d8d3c8", src: "/3.png" },

	{ title: "PBS", tilt: 5, x: 90, y: -100, z: 40, color: "#444444", src: "/4.png" },
	{ title: "Titan", tilt: 12, x: 250, y: -40, z: 50, color: "#efefef", src: "/5.png" },
	{ title: "Betterment", tilt: 22, x: 380, y: 80, z: 60, color: "#4d8ff5", src: "/6.png" },
];

export default function FeaturedProjects() {
	const router = useRouter()
	const [hovered, setHovered] = useState<string | null>(null);

	return (
		<section className="relative min-h-screen w-full overflow-hidden border-b border-zinc-100 dark:border-zinc-900 ">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:justify-between p-4 gap-6 backdrop-blur-xl  bg-black/10 dark:bg-white/5">
				<div className="leading-none z-50">
					<h1 className="font-dage text-display-lg uppercase">
						Selected Client Projects
					</h1>
				</div>

				<div className=" z-50">
					<button className="group flex items-center gap-3 border border-white px-4 py-2 lg:px-6 lg:py-3 text-white" onClick={() => { router.push("/work") }}>
						<span className="font-twid italic uppercase text-sm lg:text-base">
							View All Projects
						</span>

						<ArrowUpRight
							size={16}
							className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
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
			<div className="hidden lg:block">
				<div className="absolute left-1/2 top-[58%] h-[700px] w-[1400px] -translate-x-1/2 -translate-y-1/2">
					{projects.map((project, idx) => (
						<motion.div
							key={idx}
							className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
							onHoverStart={() => setHovered(project.title)}
							onHoverEnd={() => setHovered(null)}
							style={{
								zIndex: hovered === project.title ? 999 : project.z,
							}}
							initial={false}
							animate={{
								x: project.x,
								y:
									hovered === project.title
										? project.y + 30
										: project.y + 150,
								scale:
									hovered === project.title
										? 1.05
										: 1,
								rotate:
									hovered === project.title
										? 0
										: project.tilt,
							}}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 25,
							}}
						>
							<TiltCard
								tilt={String(project.tilt)}
								className="relative h-[720px] w-[520px] group"
							>
								<Image
									src={project.src}
									alt={project.title}
									fill
									sizes="520px"
									className="object-cover transition-transform duration-700 group-hover:scale-105"
								/>
							</TiltCard>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}