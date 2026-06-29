"use client";
import { useState } from "react";
import { SentenceRoll } from "../layout/navAnimation/navAnimation";
import SlidingText from "../layout/aboutUsButton/aboutUsButton";
import TransitionLink from "../layout/pageTransition/transitionLink";
import BottomDesc from "../layout/bottomDesc/bottomDesc";

interface bulletPoints {
	bulletPoints: string,
}

interface Data {
	title: string,
	subHeading: string,
	description: string,
	bullets: bulletPoints[],
}

const data: Data[] = [
	{
		title: "STRATEGY & INTELLIGENCE",
		subHeading: "Defines how the business competes and wins.",
		description: "We define where your business creates value, how it competes, and what drives long-term growth. Through strategy, intelligence, and positioning, we build the foundation behind every decision.",
		bullets: [
			{ bulletPoints: "Market Positioning" },
			{ bulletPoints: "Business Intelligence" },
			{ bulletPoints: "Growth Strategy" },
			{ bulletPoints: "Revenue Strategy" },
		]
	}, {
		title: "BRAND & CULTURE",
		subHeading: "Defines what the brand stands for and why people connect.",
		description: "We build the brand identity, voice, and cultural relevance that give businesses a distinct position in the market and a reason for people to connect, engage, and return.",
		bullets: [
			{ bulletPoints: "Brand Strategy" },
			{ bulletPoints: "Storytelling" },
			{ bulletPoints: "Creative Direction" },
			{ bulletPoints: "Cultural Positioning" },
		]
	}, {
		title: "PROGRAMMING & EXPERIENCES",
		subHeading: "Creates reasons for people to attend and return.",
		description: "We design experiences, activations, and recurring programming that create reasons to return, turn calendars into demand drivers, and audiences into loyal communities.",
		bullets: [
			{ bulletPoints: "Event Concepts" },
			{ bulletPoints: "Experience Design" },
			{ bulletPoints: "Venue Activations" },
			{ bulletPoints: "Experience IP" },
		]
	}, {
		title: "TALENT & PARTNERSHIPS",
		subHeading: "Brings together the right talent, brands, and partnerships.",
		description: "We connect destinations with artists, creators, brands, and strategic partners that shape culture, expand influence, and accelerate long-term growth.",
		bullets: [
			{ bulletPoints: "Talent Strategy" },
			{ bulletPoints: "Artist Booking" },
			{ bulletPoints: "Strategic Partnerships" },
			{ bulletPoints: "Sponsorships" },
		]
	}, {
		title: "COMMUNITY & DEMAND",
		subHeading: "Builds communities that sustain long-term demand and loyalty.",
		description: "We transform audiences into communities and attention into sustainable demand through engagement, retention, content strategy, and community development. ",
		bullets: [
			{ bulletPoints: "Community Building" },
			{ bulletPoints: "Audience Development" },
			{ bulletPoints: "Content Strategy" },
			{ bulletPoints: "CRM & Retention" },
		]
	}, {
		title: "OPERATIONS & PERFORMANCE",
		subHeading: "Turns strategy into repeatable performance.",
		description: "We design operating systems that turn vision into execution and execution into measurable performance—creating the consistency required for sustainable growth.",
		bullets: [
			{ bulletPoints: "Operating Systems" },
			{ bulletPoints: "SOP Development" },
			{ bulletPoints: "Revenue Optimization" },
			{ bulletPoints: "Performance Tracking" },
		]
	},
]


export default function Services() {
	const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

	return (
		<div className="flex flex-col font-twid gap-5">
			{data.map((item, idx) => (
				<div
					key={idx}
					onMouseEnter={() => setHoveredIdx(idx)}
					onMouseLeave={() => setHoveredIdx(null)}
					className="relative w-full duration-500 transition-all"
				>
					<div className="absolute bottom-0 left-0 w-full h-px bg-zinc-100 dark:bg-zinc-900" />

					<div
						className="absolute bottom-0 left-0 w-full h-px bg-[#FF0000] origin-left transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
						style={{
							transform: hoveredIdx === idx ? "scaleX(1)" : "scaleX(0)",
						}}
					/>

					<div className="flex flex-col gap-6 p-4 md:p-6">
						<div className="flex flex-col gap-1">
							<span className="text-2xl md:text-4xl lg:text-display-sm leading-none font-bold">
								<SentenceRoll
									text={item.title}
									arrow={false}
									isHovered={hoveredIdx === idx}
								/>
							</span>

							<span className="text-body-sm lg:text-body-md text-zinc-400 tracking-wide">
								{item.subHeading}
							</span>
						</div>

						<span className="w-full lg:w-[40vw] text-base text-body-md leading-relaxed">
							{item.description}
						</span>

						<div className="flex flex-col md:flex-row md:gap-2 md:gap-3 lg:gap-4">
							{item.bullets.map((bullet, bulletIdx) => (
								<span key={bulletIdx} className="text-heading-lg">
									{bullet.bulletPoints}
								</span>
							))}
						</div>
					</div>
				</div>
			))}

			<TransitionLink className="group relative w-fit h-10 px-5 border-2 rounded-xl border-zinc-100 dark:border-white flex items-center justify-center overflow-hidden ml-5 mt-10" href="/services">
				<div className="absolute inset-0 bg-[#FF0000] origin-bottom scale-y-0 transition-transform duration-500 ease-in-out group-hover:scale-y-100 rounded-xl" />
				<span className="relative z-10">
					<SlidingText text="EXPLORE SERVICES" />
				</span>
			</TransitionLink>

			<BottomDesc text1="Curated Experiences" text3="Events • Programming • Activations" className="border-t border-b border-zinc-100 dark:border-zinc-900 text-black dark:text-zinc-400"/>
		</div>
	);
}