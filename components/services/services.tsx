
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
		<div className="flex flex-col font-twid h-[180vh]">
			{data.map((items, idx) => (
				<div className="h-full w-full flex flex-col justify-center border-b border-black dark:border-zinc-600" key={idx}>
					<div className="flex flex-col p-4 gap-6">
						<div className="flex flex-col gap-1">
							<span className="text-7xl">{items.title}</span>
							<span className="text-xl text-zinc-400">{items.subHeading}</span>
						</div>
						<span className="text-lg text-zinc-400 w-[40vw]">{items.description}</span>
						<span className="flex gap-4">{items.bullets.map((items, idx) => (
							<span className="text-xl font-bold" key={idx}>{items.bulletPoints}</span>
						))}</span>
					</div>
				</div>
			))}
		</div>
	)
}