"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Second() {
	const [expanded, setExpanded] = useState<number | null>(null);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setIsMobile(window.innerWidth < 768);
	}, []);

	return (
		<div className="w-full flex flex-col p-4 gap-2 font-twid border-b border-zinc-100 dark:border-zinc-900">
			{blogs.map((items, idx) => (
				<motion.div
					key={idx}
					className="overflow-hidden cursor-pointer border-b border-zinc-100 dark:border-zinc-900 last:border-b-0"
					onClick={() =>
						setExpanded(expanded === idx ? null : idx)
					}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					initial={{ opacity: 0, y: 120 }}
					transition={{
						duration: 1,
						delay: idx * 0.2,
						ease: [0.16, 1, 0.3, 1],
					}}
				>
					<motion.div
						className="flex flex-col md:flex-row items-center"
						animate={{
							minHeight:
								expanded === idx
									? "50vh"
									: "30vh",
						}}
						transition={{
							duration: 0.6,
							ease: [0.16, 1, 0.3, 1],
						}}
					>
						{/* Image */}
						{/* Image */}
						<motion.div
							className="relative hidden md:flex self-center overflow-hidden border border-black dark:border-zinc-600 min-h-[220px]"
							initial={false}
							animate={{
								width:
									expanded === idx
										? "100%"
										: !isMobile
											? "20%"
											: 0,

								height:
									expanded === idx
										? 680
										: !isMobile
											? 220
											: 0,

								opacity:
									expanded === idx || !isMobile
										? 1
										: 0,
							}}
							transition={{
								duration: 0.6,
								ease: [0.16, 1, 0.3, 1],
							}}
						>
							<Image
								src={items.src}
								alt={items.title}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 35vw"
							/>
						</motion.div>
						{/* Content */}
						<div className="w-full p-4 flex flex-col justify-center gap-2">
							<span className="text-zinc-400 text-body-sm xl:text-body-md">
								{items.date}
							</span>

							<span className="lg:text-body-lg 2xl:text-heading-lg">
								{items.title}
							</span>

							<span className="text-body-sm 2xl:text-body-lg text-zinc-500 lg:w-[70%] xl:w-[50%]">
								{items.description}
							</span>

							<AnimatePresence>
								{expanded === idx && (
									<motion.div
										initial={{
											height: 0,
											opacity: 0,
										}}
										animate={{
											height: "auto",
											opacity: 1,
										}}
										exit={{
											height: 0,
											opacity: 0,
										}}
										transition={{
											duration: 0.5,
											ease: [0.16, 1, 0.3, 1],
										}}
										className="overflow-hidden"
									>
										<p className="pt-6 text-body-sm lg:text-body-md text-zinc-500 leading-relaxed lg:w-[85%]">
											{items.fullDescription}
										</p>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</motion.div>
				</motion.div>
			))}
		</div>
	);
}

const blogs = [
	{
		title: "How Nightlife Brands Build Community",
		date: "MAY 2026",
		src: "/1.png",
		description:
			"Building a venue is easy. Building a community is the hard part.",
		fullDescription:
			"Community is the most defensible asset in hospitality. While competitors can copy menus, interiors, and pricing, they cannot easily replicate a loyal audience that feels connected to a venue. In this article, we explore the systems, programming strategies, and brand principles that transform nightlife spaces into cultural destinations.",
	},
	{
		title: "Why Consistency Beats Virality",
		date: "APRIL 2026",
		src: "/2.png",
		description:
			"One viral reel won't save a weak operating system.",
		fullDescription:
			"Most hospitality brands chase spikes in attention while neglecting operational consistency. Sustainable growth comes from delivering repeatable experiences, building trust, and creating systems that perform regardless of trends. We break down how leading venues maintain demand year-round.",
	},
	{
		title: "The Future of Venue Growth",
		date: "MARCH 2026",
		src: "/3.png",
		description:
			"The next generation of nightlife growth looks very different.",
		fullDescription:
			"From AI-assisted operations to community-driven programming, venue growth is becoming increasingly systemized. We examine emerging trends that will define the next decade of hospitality and entertainment experiences.",
	},
];