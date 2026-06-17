"use client";
import { useEffect, useRef, useState } from "react";
import SlidingText from "../layout/aboutUsButton/aboutUsButton";
import FloatingCard from "../layout/floatingCard/floatingCard";
import ScrollRevealText from "../scrolltriger/fillColor";
import Link from "next/link";

const text =
	"What begins within our community doesn't stay here. It moves outward — shaping the work, the experiences, and the culture we bring into the world. Every collaboration and every exchange adds to something larger — influencing how ideas take form and how creative work evolves beyond individual effort. Over time, this shared momentum builds depth, direction, and relevance — allowing us to create work that resonates, performs, and lasts.";


const CARDS = [
	{ col: 0, desktopH: 360, mobileH: 240, desktopTop: 120, mobileTop: 40 },
	{ col: 1, desktopH: 240, mobileH: 200, desktopTop: 80, mobileTop: 120 },
	{ col: 2, desktopH: 320, mobileH: 200, desktopTop: 160, mobileTop: 40, mobileHidden: true },
	{ col: 0, desktopH: 240, mobileH: 200, desktopTop: 560, mobileTop: 500 },
	{ col: 1, desktopH: 360, mobileH: 240, desktopTop: 380, mobileTop: 400 },
	{ col: 2, desktopH: 280, mobileH: 160, desktopTop: 500, mobileTop: 440, mobileHidden: true },
];



export default function Second() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [cols, setCols] = useState([0, 0, 0]); // actual px positions

	useEffect(() => {
		const calculate = () => {
			const w = containerRef.current?.offsetWidth ?? window.innerWidth / 2;
			// 3 equal columns within the left half
			const colW = w / 3;
			setCols([colW * 0.05, colW * 1.05, colW * 2.05]);
		};
		calculate();
		window.addEventListener("resize", calculate);
		return () => window.removeEventListener("resize", calculate);
	}, []);

	const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

	return (
		<div className="min-h-screen w-full flex flex-col lg:flex-row relative overflow-hidden">

			{/* cards column */}
			<div ref={containerRef} className="relative w-full lg:w-1/2 h-[600px] lg:h-auto">
				{CARDS.map((card, i) => {
					if (card.mobileHidden && isMobile) return null;

					const left = cols[card.col] ?? 0;
					const top = isMobile ? card.mobileTop : card.desktopTop;
					const height = isMobile ? card.mobileH : card.desktopH;
					const width = isMobile ? 120 : 180;

					return (
						<FloatingCard
							key={i}
							y={60}
							className="absolute"
							style={{ left, top }}
						>
							<div
								className="border border-black dark:border-zinc-600 rounded-sm"
								style={{ height, width }}
							/>
						</FloatingCard>
					);
				})}
			</div>

			{/* text + cta */}
			<div className="w-full lg:w-1/2 flex flex-col justify-end p-6 lg:p-8 gap-4">
				<ScrollRevealText text={text} className="text-body-sm sm:text-body-lg md:text-heading-lg" />
				<Link className="group relative w-fit h-10 px-5 border-2 rounded-xl border-black dark:border-white flex items-center justify-center overflow-hidden" href="/about">
					<div className="absolute inset-0 bg-[#ff2d55] origin-bottom scale-y-0 transition-transform duration-500 ease-in-out group-hover:scale-y-100 rounded-xl" />
					<span className="relative z-10">
						<SlidingText text="ABOUT US" />
					</span>
				</Link>
			</div>
		</div>
	);
}