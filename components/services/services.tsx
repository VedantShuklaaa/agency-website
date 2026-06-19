
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
		title: "Demand Generation",
		subHeading: "ALIGNED TO BRING THE RIGHT CROWD.",
		description: "We engineer consistent footfall through curated networks, influencers, guest lists, and communities—bringing people who fit the venue, not just volume.",
		bullets: [
			{ bulletPoints: "Influencers" },
			{ bulletPoints: "Guest Lists" },
			{ bulletPoints: "Communities" },
			{ bulletPoints: "Networks" },
			{ bulletPoints: "Distribution" },
		]
	}, {
		title: "Positioning & Brand System",
		subHeading: "SHAPE PERCEPTION. BUILD DESIRE.",
		description: "We define how your venue is seen before people walk in—through identity, storytelling, and content systems that make you recognizable and chosen.",
		bullets: [
			{ bulletPoints: "Brand Identity" },
			{ bulletPoints: "Story Telling" },
			{ bulletPoints: "Strategy" },
			{ bulletPoints: "Content" },
			{ bulletPoints: "Creatives" },
		]
	}, {
		title: "Programming & Experience Design",
		subHeading: "EVERY NIGHT. PLANNED WITH INTENT.",
		description: "We design high-energy nights with structure—music, flow, and crowd psychology—turning your calendar into a demand driver.",
		bullets: [
			{ bulletPoints: "Event Design" },
			{ bulletPoints: "Calendar" },
			{ bulletPoints: "Production" },
			{ bulletPoints: "Crowd Psychology" },
			{ bulletPoints: "Concepts" },
		]
	}, {
		title: "Talent & Culture Layer",
		subHeading: "RIGHT TALENT. RIGHT MOMENT.",
		description: "We curate artists and talent that match your audience and elevate your identity—no random bookings, only strategic alignment",
		bullets: [
			{ bulletPoints: "Artist Booking" },
			{ bulletPoints: "Talent Strategy" },
			{ bulletPoints: "Performance" },
			{ bulletPoints: "Cultural Fit" },
		]
	}, {
		title: "Partnerships & Growth",
		subHeading: "EXPAND REACH. BUILD RELEVANCE.",
		description: "We create collaborations that amplify visibility, credibility, and demand—extending your venue beyond its walls.",
		bullets: [
			{ bulletPoints: "Brand Tie-ups" },
			{ bulletPoints: "Partnerships" },
			{ bulletPoints: "Sponsorships" },
			{ bulletPoints: "Community" },
			{ bulletPoints: "Clients" },
		]
	}, {
		title: "Execution & Revenue Systems",
		subHeading: "FLAWLESS DELIVERY. REAL RETURNS.",
		description: "We handle on-ground execution and align operations with revenue—ensuring every night performs, not just runs.",
		bullets: [
			{ bulletPoints: "Operations" },
			{ bulletPoints: "Promotions" },
			{ bulletPoints: "On-Ground" },
			{ bulletPoints: "Coordination" },
			{ bulletPoints: "Revenue" },
		]
	},
]


export default function Services() {
	return (
		<div className="flex flex-col font-twid">
			{data.map((item, idx) => (
				<div
					key={idx}
					className="w-full border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-950 duration-500 transition-all"
				>
					<div className="flex flex-col gap-6 p-4 md:p-6">

						{/* Heading */}
						<div className="flex flex-col gap-2">
							<span className="text-display-sm leading-none">
								{item.title}
							</span>

							<span className="text-body-md text-zinc-400 tracking-wide">
								{item.subHeading}
							</span>
						</div>

						{/* Description */}
						<span className="w-full lg:w-[40vw] text-base text-body-md text-zinc-400 leading-relaxed">
							{item.description}
						</span>

						{/* Bullets */}
						<div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4">
							{item.bullets.map((bullet, bulletIdx) => (
								<span
									key={bulletIdx}
									className="text-body-md font-bold border border-zinc-100 dark:border-zinc-800 rounded-full px-3 py-1"
								>
									{bullet.bulletPoints}
								</span>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}