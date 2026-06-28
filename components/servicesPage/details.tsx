"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import BigRevealCard from "../layout/video/revealVIdeo";
import Image from "next/image";
import { SentenceRoll, WordRoll } from "../layout/navAnimation/navAnimation";

interface bulletPoints {
	bulletPoints: string,
}

interface Data {
	title: string,
	sub: string,
	description: string,
	bullets1: bulletPoints[],
	bullets2: bulletPoints[],
	bullets3: bulletPoints[],
}

const data: Data[] = [
	{
		title: "STRATEGY & INTELLIGENCE",
		sub: "Defines how the business competes and wins.",
		description: "We help businesses make better decisions by understanding their market, customers, competitors, and commercial opportunities before execution begins.",
		bullets1: [
			{ bulletPoints: "Market Positioning" },
			{ bulletPoints: "Business Intelligence" },
			{ bulletPoints: "Concept Development" },
			{ bulletPoints: "Competitive Analysis" },
		],
		bullets2: [
			{ bulletPoints: "Customer Journey Design" },
			{ bulletPoints: "Revenue Strategy" },
			{ bulletPoints: "Growth Planning" },
			{ bulletPoints: "Business Model Design" },
		],
		bullets3: [
			{ bulletPoints: "Audience Research" },
			{ bulletPoints: "Performance Audits" },
		],
	}, {
		title: "BRAND & CULTURE",
		sub: "Defines what the brand stands for and why people connect.",
		description: "We develop the strategic and creative foundations that shape perception, strengthen recognition, and build lasting cultural relevance.",
		bullets1: [
			{ bulletPoints: "Brand Strategy" },
			{ bulletPoints: "Storytelling" },
			{ bulletPoints: "Creative Direction" },
			{ bulletPoints: "Visual Identity" },
		],
		bullets2: [
			{ bulletPoints: "Brand Guidelines" },
			{ bulletPoints: "Cultural Positioning" },
			{ bulletPoints: "Community Architecture" },
			{ bulletPoints: "Brand Partnerships" },
		],
		bullets3: [
			{ bulletPoints: "Communication Frameworks" },
			{ bulletPoints: "Campaign Concepts" },
		],
	}, {
		title: "PROGRAMMING & EXPERIENCES",
		sub: "Creates reasons for people to attend and return.",
		description: "We design event ecosystems that create anticipation, strengthen loyalty, and keep people returning long after the first visit.",
		bullets1: [
			{ bulletPoints: "Event Concepts" },
			{ bulletPoints: "Programming Calendars" },
			{ bulletPoints: "Experience Design" },
			{ bulletPoints: "Venue Activations" },
		],
		bullets2: [
			{ bulletPoints: "Signature Event Properties" },
			{ bulletPoints: "Recurring Event Formats" },
			{ bulletPoints: "Festival Concepts" },
			{ bulletPoints: "Cultural IP Development" },
		],
		bullets3: [
			{ bulletPoints: "Guest Experience Design" },
			{ bulletPoints: "Audience Psychology" },
		],
	}, {
		title: "TALENT & PARTNERSHIPS",
		sub: "Builds the ecosystem around the venue.",
		description: "We develop strategic relationships that strengthen culture, unlock opportunities, and expand the value created around the business.",
		bullets1: [
			{ bulletPoints: "Talent Strategy" },
			{ bulletPoints: "Artist Booking" },
			{ bulletPoints: "DJ Networks" },
			{ bulletPoints: "Performer Management" },
		],
		bullets2: [
			{ bulletPoints: "Creator Collaborations" },
			{ bulletPoints: "Brand Partnerships" },
			{ bulletPoints: "Sponsorship Development" },
			{ bulletPoints: "Strategic Alliances" },
		],
		bullets3: [
			{ bulletPoints: "Influencer Collaborations" },
			{ bulletPoints: "Ecosystem Development" },
		],
	}, {
		title: "COMMUNITY & DEMAND",
		sub: "Builds communities that sustain long-term demand and loyalty. ",
		description: "We help businesses build relationships that increase retention, strengthen advocacy, and create demand that compounds over time",
		bullets1: [
			{ bulletPoints: "Community Building" },
			{ bulletPoints: "Audience Development" },
			{ bulletPoints: "Social Media Management" },
			{ bulletPoints: "Content Strategy" },
		],
		bullets2: [
			{ bulletPoints: "Photography" },
			{ bulletPoints: "Videography" },
			{ bulletPoints: "Aftermovies & Podcasts" },
			{ bulletPoints: "Influencer Marketing" },
		],
		bullets3: [
			{ bulletPoints: "Public Relations" },
			{ bulletPoints: "CRM & Retention Systems" },
			{ bulletPoints: "Email & WhatsApp Marketing" },
			{ bulletPoints: "Community Engagement Programs" },
		],
	}, {
		title: "OPERATIONS & PERFORMANCE",
		sub: "Turns strategy into repeatable performance.",
		description: "We create the operational structure, processes, and accountability required to deliver consistent execution and measurable business performance.",
		bullets1: [
			{ bulletPoints: "Operating Systems" },
			{ bulletPoints: "SOP Development" },
			{ bulletPoints: "Team Structure Design" },
			{ bulletPoints: "Team Management" },
		],
		bullets2: [
			{ bulletPoints: "Vendor Management" },
			{ bulletPoints: "Launch Support" },
			{ bulletPoints: "Revenue Optimization" },
			{ bulletPoints: "Performance Tracking" },
		],
		bullets3: [
			{ bulletPoints: "Execution Management" },
			{ bulletPoints: "Reporting Systems" },
			{ bulletPoints: "Operational Audits" },
			{ bulletPoints: "Business Performance Reviews" },
		],
	},
];

export default function DetailCard() {
	const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

	return (
		<div className="mt-20 md:mt-28 lg:mt-20 flex flex-col gap-8 lg:gap-10">
			<BigRevealCard className="mx-auto h-[35vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh] w-[95vw] md:w-[85vw] lg:w-[70vw] overflow-hidden rounded-sm">
				<div className="relative mx-auto w-full max-w-6xl aspect-[16/9]">
					<Image
						src="/AQUA_RUMBLE.webp"
						alt="About section artwork"
						fill
						sizes="(max-width: 768px) 95vw, (max-width: 1024px) 85vw, 70vw"
						className="object-cover"
						quality={70}
					/>
				</div>
			</BigRevealCard>

			<div className="flex flex-col w-full font-twid">
				{data.map((item, idx) => (
					<motion.div
						key={idx}
						initial={{ y: 60, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
						onMouseEnter={() => setHoveredIdx(idx)}
						onMouseLeave={() => setHoveredIdx(null)}
						className="service-card relative min-h-[30vh] w-full flex flex-col justify-center gap-4 border p-4 duration-500 transition-all"
					>
						<div className="absolute bottom-0 left-0 w-full h-px bg-zinc-100 dark:bg-zinc-900" />

						<div
							className="absolute bottom-0 left-0 w-full h-px bg-[#FF0000] origin-left transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
							style={{
								transform: hoveredIdx === idx ? "scaleX(1)" : "scaleX(0)",
							}}
						/>

						<div className="w-full flex flex-col gap-2">
							<div className="flex flex-col lg:flex-row gap-4 lg:gap-0">
								<div className="w-10 text-base md:text-lg lg:text-xl">0{idx + 1}</div>
								<div className="flex w-full gap-5">
									<div className="w-fit text-2xl md:text-4xl lg:text-display-sm flex items-center justify-center">
										<SentenceRoll
											text={item.title}
											arrow={false}
											isHovered={hoveredIdx === idx}
										/>
									</div>
								</div>
							</div>

							<div className="text-body-sm md:text-body-lg text-zinc-400 tracking-wide md:px-4 lg:px-10">
								{item.sub}
							</div>

							<div className="w-full lg:w-[50vw] text-body-md leading-relaxed md:px-4 lg:px-10">
								{item.description}
							</div>
						</div>

						<div className="w-full md:px-4 lg:px-10 flex flex-col gap-2">
							<div className="flex flex-col md:flex-row md:gap-2 lg:gap-4">
								{item.bullets1.map((bullet, bulletIdx) => (
									<span key={bulletIdx} className="text-heading-lg flex">
										• <WordRoll text={bullet.bulletPoints} />
									</span>
								))}
							</div>
							<div className="flex flex-col md:flex-row md:gap-2 lg:gap-4">
								{item.bullets2.map((bullet, bulletIdx) => (
									<span key={bulletIdx} className="text-heading-lg flex">
										• <WordRoll text={bullet.bulletPoints} />
									</span>
								))}
							</div>
							<div className="flex flex-col md:flex-row md:gap-2 lg:gap-4">
								{item.bullets3.map((bullet, bulletIdx) => (
									<span key={bulletIdx} className="text-heading-lg flex">
										• <WordRoll text={bullet.bulletPoints} />
									</span>
								))}
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}