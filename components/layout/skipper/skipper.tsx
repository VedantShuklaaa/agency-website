"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

const images = [
	"/images/lummi/img15.png",
	"/images/lummi/img21.png",
	"/images/lummi/img3.png",
	"/images/lummi/img4.png",
	"/images/lummi/img5.png",
	"/images/lummi/img6.png",
	"/images/lummi/img7.png",
	"/images/lummi/img8.png",
	"/images/lummi/img24.png",
	"/images/lummi/img10.png",
	"/images/lummi/img11.png",
	"/images/lummi/img12.png",
	"/images/lummi/img13.png",
];

const fallbackColors = [
	"#F8EDEB",
	"#EAE4E9",
	"#D8E2DC",
	"#FFE5D9",
	"#E2ECE9",
	"#F4F1DE",
	"#DDEDEA",
	"#E8DFF5",
];

const Skiper30 = () => {
	const gallery = useRef<HTMLDivElement>(null);
	const [dimension, setDimension] = useState({ width: 0, height: 0 });

	const { scrollYProgress } = useScroll({
		target: gallery,
		offset: ["start end", "end start"],
	});

	const { height } = dimension;
	const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
	const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
	const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
	const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

	useEffect(() => {
		const resize = () => {
			setDimension({ width: window.innerWidth, height: window.innerHeight });
		};

		window.addEventListener("resize", resize);
		resize();

		return () => {
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<main className="w-full bg-[#eee] text-black">
			<div
				ref={gallery}
				className="relative box-border flex w-full h-[175vh] gap-[2vw] overflow-hidden bg-[background] p-[2vw]"
			>
				<Column images={[images[0], images[1], images[2]]} y={y} />
				<Column images={[images[3], images[4], images[5]]} y={y2} />
				<Column images={[images[6], images[7], images[8]]} y={y3} />
				<Column images={[images[6], images[7], images[8]]} y={y4} />
			</div>

		</main>
	);
};

type ColumnProps = {
	images: string[];
	y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
	return (
		<motion.div
			className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
			style={{ y }}
		>
			{images.map((src, i) => {
				const color =
					fallbackColors[Math.floor(Math.random() * fallbackColors.length)];

				return (
					<div
						key={i}
						className="relative h-full w-full overflow-hidden border hover:scale-102 duration-300"
						style={{ backgroundColor: color }}
					>
						<img
							src={src}
							alt=""
							className="h-full w-full object-cover"
							onError={(e) => {
								e.currentTarget.style.display = "none";
							}}
						/>
					</div>
				);
			})}
		</motion.div>
	);
};

export { Skiper30 };