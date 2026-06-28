"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TransitionLink from "../layout/pageTransition/transitionLink";
import { ShieldHalf } from "lucide-react";

type Blog = {
	id: string;
	title: string;
	slug: string;
	description: string;
	category: string;
	tags: string[];
	date: string;
	image_url: string;
};

export default function BlogGrid() {
	const [active, setActive] = useState("All");
	const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [categories, setCategories] = useState<string[]>(["All"]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/categories")
			.then((r) => r.json())
			.then((data) => {
				const names = Array.isArray(data) ? data.map((c: { name: string }) => c.name) : [];
				setCategories(["All", ...names]);
			})
			.catch(() => setCategories(["All"]));
	}, []);

	useEffect(() => {
		fetch("/api/blogs")
			.then((r) => r.json())
			.then((data) => {
				if (!Array.isArray(data)) {
					console.error("Unexpected /api/blogs response:", data);
					setBlogs([]);
					return;
				}
				setBlogs(data);
			})
			.catch((err) => {
				console.error("Failed to fetch blogs:", err);
				setBlogs([]);
			})
			.finally(() => setLoading(false));
	}, []);

	const months: Record<string, number> = {
		JANUARY: 1, FEBRUARY: 2, MARCH: 3, APRIL: 4,
		MAY: 5, JUNE: 6, JULY: 7, AUGUST: 8,
		SEPTEMBER: 9, OCTOBER: 10, NOVEMBER: 11, DECEMBER: 12,
	};

	const parse = (d: string) => {
		const [month, year] = d.split(" ");
		return Number(year) * 100 + months[month.toUpperCase()];
	};

	const filtered = [...blogs]
		.filter((b) => active === "All" || b.category === active)
		.sort((a, b) =>
			sortOrder === "latest"
				? parse(b.date) - parse(a.date)
				: parse(a.date) - parse(b.date)
		);

	const [cols, setCols] = useState(3);

	useEffect(() => {
		const update = () => {
			const w = window.innerWidth;
			setCols(w < 480 ? 1 : w < 768 ? 2 : w < 1280 ? 3 : 5);
		};
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	return (
		<div className="w-full flex flex-col font-twid border-b border-zinc-100 dark:border-zinc-900">

			{/* Controls */}
			<div className="px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-900">
				<div className="flex flex-wrap gap-2">
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => setActive(cat)}
							className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-150
								${active === cat
									? "bg-foreground text-background border-transparent font-medium"
									: "bg-transparent text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:text-[#FF0000]"
								}`}
						>
							{cat}
						</button>
					))}
				</div>

				<div className="flex items-center gap-2">
					<button
						onClick={() => setSortOrder((p) => p === "latest" ? "oldest" : "latest")}
						className="text-sm border border-zinc-200 dark:border-zinc-800 px-4 py-1.5 rounded-full text-zinc-500 hover:text-[#FF0000] transition-all whitespace-nowrap"
					>
						{sortOrder === "latest" ? "Latest First" : "Oldest First"}
					</button>

					<TransitionLink
						href="/admin"
						className="flex items-center gap-1.5 text-sm border border-zinc-200 dark:border-zinc-800 px-4 py-1.5 rounded-full text-zinc-500 hover:text-[#FF0000] transition-all whitespace-nowrap"
					>
						<ShieldHalf className="h-3.5 w-3.5" />
						Admin
					</TransitionLink>
				</div>
			</div>

			{/* Masonry Grid */}
			{
				loading ? (
					<div
						style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "1rem" }}
						className="w-full p-2"
					>
						{Array.from({ length: cols * 2 }).map((_, i) => (
							<div key={i} className="flex flex-col gap-3 animate-pulse">
								<div
									style={{ height: 300 }}
									className="w-full rounded-md bg-zinc-200 dark:bg-zinc-800"
								/>
								<div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
								<div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
								<div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
							</div>
						))}
					</div>
				) : filtered.length === 0 ? (
					<div className="p-10 text-center text-zinc-400 text-body-sm">
						No posts in this category yet.
					</div>
				) : (
					<div
						style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "1rem" }}
						className="w-full p-2"
					>
						{filtered.map((item, idx) => (
							<motion.div
								key={item.slug}
								className="break-inside-avoid mb-4"
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									duration: 0.7,
									delay: idx * 0.1,
									ease: [0.16, 1, 0.3, 1],
								}}
							>
								<TransitionLink
									href={`/blog/${item.slug}`}
									className="group flex flex-col gap-3"
								>
									{/* Image */}
									<div
										style={{ height: 300 }}
										className="relative w-full overflow-hidden border border-zinc-100 dark:border-zinc-900"
									>
										<Image
											src={item.image_url}
											alt={item.title}
											fill
											className="object-cover transition-transform duration-700 group-hover:scale-105"
											sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 20vw"
										/>
										{/* fallback bg so card is visible when image missing */}
										<div className="absolute inset-0 bg-zinc-900 -z-10" />

										<div style={{ position: "absolute", top: 5, left: 5, display: "flex", gap: 4, flexWrap: "wrap", zIndex: 10 }}>
											{item.tags.map((tag) => (
												<span
													key={tag}
													style={{
														background: "rgba(255,255,255,0.9)",
														backdropFilter: "blur(4px)",
														borderRadius: "6px",
														padding: "2px 8px",
														fontSize: "12px",
														fontWeight: 500,
														color: "black",
													}}
												>
													{tag}
												</span>
											))}
										</div>
									</div>

									{/* Meta */}
									<div className="flex flex-col gap-1 pb-2">
										<span className="text-xs text-zinc-400 font-onest">
											{item.date}
										</span>
										<h3 className="text-body-md font-medium leading-snug group-hover:text-[#FF0000] transition-colors duration-200">
											{item.title}
										</h3>
										<p className="text-body-sm text-zinc-500 leading-relaxed line-clamp-2">
											{item.description}
										</p>
									</div>
								</TransitionLink>
							</motion.div>
						))}
					</div>
				)
			}
		</div >
	);
}