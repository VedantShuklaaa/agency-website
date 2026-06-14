"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const COLORS = [
	"#0a0a0a", "#ff2d55", "#1a1a2e", "#16213e",
	"#e94560", "#0f3460", "#533483", "#2b2d42",
];

const IMAGES = [
	{ src: "", label: "Brand Identity" },
	{ src: "", label: "Web Design" },
	{ src: "", label: "Motion" },
	{ src: "", label: "AI Labs" },
	{ src: "", label: "Development" },
	{ src: "", label: "Strategy" },
];

export default function HoverExpand() {
	const [active, setActive] = useState<number>(0);

	return (
		<div className="w-full max-w-4xl mx-auto px-6 flex flex-col gap-1 font-twid">
			{IMAGES.map((img, i) => (
				<motion.div
					key={i}
					className="relative cursor-pointer overflow-hidden rounded-2xl w-full"
					animate={{ height: active === i ? "380px" : "48px" }}
					transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
					onHoverStart={() => setActive(i)}
					style={{
						background: !img.src ? COLORS[i % COLORS.length] : undefined,
					}}
				>
					{/* only render img if src exists */}
					{img.src && (
						<img
							src={img.src}
							alt="NA"
							className="w-full h-full object-cover"
						/>
					)}

					{/* rest stays the same */}

					{/* collapsed label — visible when not active */}
					<AnimatePresence>
						{active !== i && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
								className="absolute inset-0 flex items-center px-5"
							>
								<span className="text-sm font-medium tracking-widest uppercase">
									{img.label}
								</span>
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
									className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end"
								>
									<span className="text-white text-2xl font-bold tracking-tight">
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