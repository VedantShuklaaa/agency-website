"use client";
import TiltCard from "@/components/layout/tiltCard/tiltCard";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
	{ title: "Vibrant", tilt: -20, x: -390, y: 10, z: 10, color: "#d8cdb5" },
	{ title: "Just Salad", tilt: -10, x: -260, y: -50, z: 20, color: "#7ca4ff" },
	{ title: "Epbright", tilt: -2, x: -90, y: -100, z: 30, color: "#d8d3c8" },

	{ title: "PBS", tilt: 5, x: 90, y: -100, z: 40, color: "#444444" },
	{ title: "Titan", tilt: 12, x: 250, y: -40, z: 50, color: "#efefef" },
	{ title: "Betterment", tilt: 22, x: 380, y: 80, z: 60, color: "#4d8ff5" },
];

export default function FeaturedProjects() {
	const [hovered, setHovered] = useState<string | null>(null);

	return (
		<section className="relative h-screen w-full overflow-hidden bg-black">
			{/* Header */}
			<div className="absolute left-6 top-6 z-50">
				<h1 className="font-druk text-6xl text-white uppercase">
					Selected Client Projects
				</h1>
			</div>

			<div className="absolute right-6 top-6 z-50">
				<button className="group flex items-center gap-3 border border-white px-6 py-3 text-white">
					<span className="font-twid italic uppercase">
						View All Projects
					</span>

					<ArrowUpRight
						size={18}
						className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
					/>
				</button>
			</div>

			{/* Cards */}
			<div className="absolute left-1/2 top-[58%] h-[700px] w-[1400px] -translate-x-1/2 -translate-y-1/2">
				{projects.map((project) => (
					<motion.div
						key={project.title}
						className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
						onHoverStart={() => setHovered(project.title)}
						onHoverEnd={() => setHovered(null)}
						style={{
							zIndex:
								hovered === project.title
									? 999
									: project.z,
						}}
						initial={false}
						animate={{
							x: project.x,
							y: hovered === project.title
								? project.y - 20
								: project.y,
							scale: hovered === project.title ? 1.05 : 1,
							rotate: hovered === project.title ? 0 : project.tilt,
						}}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 25,
						}}
					>
						<TiltCard
							tilt={String(project.tilt)}
							className="h-[720px] w-[520px]"
						>
							<div
								className="h-full w-full"
								style={{ backgroundColor: project.color }}
							/>
						</TiltCard>
					</motion.div>
				))}
			</div>
		</section>
	);
}