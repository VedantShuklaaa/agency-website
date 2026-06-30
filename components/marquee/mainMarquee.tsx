"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface MarqueeItem {
	text: string;
	img: string;
}

const ITEMS: MarqueeItem[] = [
	{ text: "Design", img: "https://picsum.photos/seed/design/200/140" },
	{ text: "Develop", img: "https://picsum.photos/seed/develop/200/140" },
	{ text: "Launch", img: "https://picsum.photos/seed/launch/200/140" },
	{ text: "Scale", img: "https://picsum.photos/seed/scale/200/140" },
	{ text: "Repeat", img: "https://picsum.photos/seed/repeat/200/140" },
];

export default function MainMarquee() {
	const trackItems = useMemo(() => [...ITEMS, ...ITEMS], []);

	return (
		<div className="w-full overflow-hidden relative py-[60px] bg-background border-y border-zinc-100 dark:border-zinc-900">
			<motion.div
				className="flex flex-nowrap w-max"
				animate={{ x: ["0%", "-50%"] }}
				transition={{ duration: 22, ease: "linear", repeat: Infinity }}
			>
				{trackItems.map((item, i) => {
					const tiltSign = i % 2 === 0 ? -1 : 1;
					return (
						<motion.div
							key={`${item.text}-${i}`}
							initial="rest"
							whileHover="hover"
							animate="rest"
							className="relative isolate flex-none whitespace-nowrap text-[64px] font-semibold tracking-[-0.02em] px-12  cursor-default"
							variants={{
								hover: { color: "#d85a30" },
							}}
							transition={{ duration: 0.25 }}
						>
							{item.text}
							<motion.img
								src={item.img}
								alt={item.text}
								className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[250px] h-auto rounded-lg shadow-[0_14px_30px_rgba(0,0,0,0.45)]"
								style={{ x: "-50%", y: "-50%" }}
								variants={{
									rest: { opacity: 0, scale: 0.85, rotate: tiltSign * -6 },
									hover: { opacity: 1, scale: 1, rotate: tiltSign * -6 },
								}}
								transition={{ duration: 0.28, ease: "easeOut" }}
							/>
							<span className="absolute right-2 top-1/2 -translate-y-1/2 flex h-2.5 w-2.5">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
								<span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
							</span>
						</motion.div>
					);
				})}
			</motion.div>
		</div>
	);
}