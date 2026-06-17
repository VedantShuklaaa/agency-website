"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const images = [
	"/1.png",
	"/2.png",
	"/3.png",
	"/4.png",
	"/5.png",
	"/6.png",
	"/AQUA_RUMBLE.png",
	"/KITTY&CHAOS.png",
	"/WILDRUN.png",
	"/1.png",
	"/2.png",
	"/3.png",
];

const fallbackColors = [
	"#F8EDEB", "#EAE4E9", "#D8E2DC", "#FFE5D9",
	"#E2ECE9", "#F4F1DE", "#DDEDEA", "#E8DFF5",
];

// top offsets as % of vh — smaller on mobile so cards stay visible
const COL_OFFSETS = {
	mobile: [-0.4, -0.7],
	tablet: [-0.5, -0.9, -0.4],
	desktop: [-0.9, -1.6, -0.45, -1.2],
};

const MULTIPLIERS = {
	mobile: [1.2, 1.8],
	tablet: [1.5, 2.2, 1.2],
	desktop: [2, 3.3, 1.25, 3],
};

// repeat images N times so columns are always full
function fillImages(imgs: string[], count: number) {
	const result: string[] = [];
	while (result.length < count) result.push(...imgs);
	return result.slice(0, count);
}

const Skiper30 = () => {
	const gallery = useRef<HTMLDivElement>(null);
	const [vh, setVh] = useState(800);
	const [cols, setCols] = useState(4);

	const { scrollYProgress } = useScroll({
		target: gallery,
		offset: ["start end", "end start"],
	});

	useEffect(() => {
		const update = () => {
			const w = window.innerWidth;
			setVh(window.innerHeight);
			setCols(w < 640 ? 2 : w < 1024 ? 3 : 4);
		};
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	const breakpoint = cols === 2 ? "mobile" : cols === 3 ? "tablet" : "desktop";
	const offsets = COL_OFFSETS[breakpoint];
	const multipliers = MULTIPLIERS[breakpoint];

	// more images per column on mobile so they never run out
	const imgsPerCol = cols === 2 ? 8 : cols === 3 ? 6 : 4;
	const groups = Array.from({ length: cols }, (_, i) => {
		// rotate starting image per column so they're different
		const rotated = [...images.slice(i * 3), ...images.slice(0, i * 3)];
		return fillImages(rotated, imgsPerCol);
	});

	const y0 = useTransform(scrollYProgress, [0, 1], [0, vh * multipliers[0]]);
	const y1 = useTransform(scrollYProgress, [0, 1], [0, vh * multipliers[1]]);
	const y2 = useTransform(scrollYProgress, [0, 1], [0, vh * (multipliers[2] ?? 0)]);
	const y3 = useTransform(scrollYProgress, [0, 1], [0, vh * (multipliers[3] ?? 0)]);
	const yValues = [y0, y1, y2, y3];

	return (
		<main className="w-full text-black">
			<div
				ref={gallery}
				className="relative box-border flex w-full h-[175vh] gap-[2vw] overflow-hidden p-[2vw]"
			>
				{groups.map((group, i) => (
					<Column
						key={i}
						images={group}
						y={yValues[i]}
						topOffset={offsets[i] * vh}
					/>
				))}
			</div>
		</main>
	);
};

type ColumnProps = {
	images: string[];
	y: MotionValue<number>;
	topOffset: number;
};

const Column = ({ images, y, topOffset }: ColumnProps) => {
	return (
		<motion.div
			className="relative flex h-full flex-1 flex-col gap-[2vw]"
			style={{ y, top: topOffset }}
		>
			{images.map((src, i) => {
				const color = fallbackColors[i % fallbackColors.length];
				return (
					<div
						key={i}
						className="relative w-full flex-shrink-0 overflow-hidden border duration-300 hover:scale-[1.02]"
						style={{
							backgroundColor: color,
							// taller cards on mobile so they fill more space
							height: "clamp(180px, 40vw, 380px)",
						}}
					>
						<img
							src={src}
							alt=""
							className="h-full w-full object-cover"
							onError={(e) => { e.currentTarget.style.display = "none"; }}
						/>
					</div>
				);
			})}
		</motion.div>
	);
};

export { Skiper30 };