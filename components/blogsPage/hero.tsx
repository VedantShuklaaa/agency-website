"use client";

export default function Hero() {
	return (
		<div className="min-h-[40vh] lg:h-[60vh] w-full flex flex-col items-center justify-center gap-10">
			<div className="flex flex-col items-center leading-none">
				<span className="text-display-xl xl:text-display-lg 2xl:text-display-xl tracking-tight font-dage">INTELLIGENCE.</span>
				<span className="text-xl text-zinc-400 text-center font-twid">Strategy, culture, and industry insight — curated for the serious operator.</span>
			</div>

			<CategoryPills />
		</div>
	)
}


const categories = [
	{ label: "All", icon: "🎯" },
	{ label: "Nightlife", icon: "🌙" },
	{ label: "Strategy", icon: "📊" },
	{ label: "Culture", icon: "🎵" },
	{ label: "Branding", icon: "✦" },
	{ label: "Operations", icon: "⚙" },
	{ label: "Community", icon: "👥" },
	{ label: "Trends", icon: "↗" },
];

function CategoryPills() {
	return (
		<div className="flex flex-wrap gap-2 justify-center">
			{categories.map(({ label, icon }) => (
				<button
					key={label}
					className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-150 border`}
				>
					<span>{icon}</span>
					<span className="font-twid text-body-sm">{label}</span>
				</button>
			))}
		</div>
	);
}