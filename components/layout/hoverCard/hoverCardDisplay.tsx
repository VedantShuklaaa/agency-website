"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const COLORS = [
	"#0a0a0a", "#ff2d55", "#1a1a2e", "#16213e",
	"#e94560", "#0f3460", "#533483", "#2b2d42",
];

const IMAGES = [
	{ src: "/1.webp", label: "Brand Identity" },
	{ src: "/2.webp", label: "Web Design" },
	{ src: "/3.webp", label: "Motion" },
	{ src: "/4.webp", label: "AI Labs" },
	{ src: "/5.webp", label: "Development" },
	{ src: "/6.webp", label: "Strategy" },
];

export default function HoverExpand() {
	const [active, setActive] = useState<number>(0);

	return (
		<div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col gap-2 font-twid">
			{IMAGES.map((img, i) => (
				<motion.div
					layout
					key={i}
					className={`relative cursor-pointer overflow-hidden rounded-[10px] w-full transition-all duration-400
					${active === i
							? "h-[220px] md:h-[300px] lg:h-[380px]"
							: "h-12"}`}
					transition={{
						layout: {
							duration: 0.8,
							ease: [0.32, 0.72, 0, 1],
						},
					}}
					onHoverStart={() => setActive(i)}
					onClick={() => setActive(i)}
					style={{
						background: !img.src ? COLORS[i % COLORS.length] : undefined,
					}}
				>
					<div className="relative w-full h-full">
						{img.src && (

							<Image
								src={img.src}
								alt={img.label}
								fill
								className="object-cover"
								sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1024px) calc(100vw - 3rem), 1280px"
								quality={70}
							/>

						)}
					</div>


					<AnimatePresence>
						{active !== i && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
								className="absolute inset-0 flex items-center px-5"
							>
								<span className="text-xs md:text-sm font-medium tracking-widest uppercase">
									{img.label}
								</span>ƒ
							</motion.div>
						)}
					</AnimatePresence>

					{/* expanded overlay */}
					<AnimatePresence>
						{active === i && (
							<>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
								/>
								<motion.div
									initial={{ opacity: 0, y: 12 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 12 }}
									transition={{ duration: 0.25, delay: 0.1 }}
									className="absolute bottom-0 left-0 right-0 p-4 md:p-5 lg:p-6 flex justify-between items-end"
								>
									<span className="text-white text-lg md:text-xl lg:text-2xl font-bold tracking-tight">
										{img.label}
									</span>
									<span className="text-white/50 text-xs font-mono tracking-widest uppercase">
										{String(i + 1).padStart(2, "0")}
									</span>
								</motion.div>
							</>
						)}
					</AnimatePresence>
				</motion.div>
			))}
		</div>
	);
}