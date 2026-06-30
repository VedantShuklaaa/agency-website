//LOADER CLASS
export const headingClass =
	"flex flex-col text-center font-twid font-medium leading-none text-3xl md:text-5xl lg:text-[12vw]";

//BLOGS
type Blog = {
	title: string;
	date: string;
	slug: string;
	src: string;
	category: string;
	tags: string[];
	description: string;
};

export const blogs: Blog[] = [
	{
		title: "How Nightlife Brands Build Community",
		date: "MAY 2026",
		slug: "how-nightlife-brands-build-community",
		src: "/1.webp",
		category: "Nightlife",
		tags: ["Nightlife", "Culture"],
		description: "Building a venue is easy. Building a community is the hard part.",
	},
	{
		title: "Why Consistency Beats Virality",
		date: "APRIL 2026",
		slug: "why-consistency-beats-virality",
		src: "/2.webp",
		category: "Strategy",
		tags: ["Strategy"],
		description: "One viral reel won't save a weak operating system.",
	},
	{
		title: "The Future of Venue Growth",
		date: "MARCH 2026",
		slug: "the-future-of-venue-growth",
		src: "/3.webp",
		category: "Trends",
		tags: ["Trends"],
		description: "The next generation of nightlife growth looks very different.",
	},
	{
		title: "How to Build a Brand People Actually Remember",
		date: "FEBRUARY 2026",
		slug: "how-to-build-a-brand-people-remember",
		src: "/4.webp",
		category: "Branding",
		tags: ["Branding", "Strategy"],
		description: "Most venues have a logo. Very few have a brand.",
	},
	{
		title: "The Operator's Guide to Programming Nights",
		date: "JANUARY 2026",
		slug: "operators-guide-to-programming-nights",
		src: "/5.webp",
		category: "Nightlife",
		tags: ["Nightlife"],
		description: "Great nights don't happen by accident. Here's the system behind them.",
	}, {
		title: "Why Your Venue Needs a Content System",
		date: "DECEMBER 2025",
		slug: "why-your-venue-needs-a-content-system",
		src: "/6.webp",
		category: "Strategy",
		tags: ["Strategy", "Branding"],
		description: "Posting randomly is not a strategy. Here's how to build one that works.",
	},
	{
		title: "The Role of Talent in Venue Identity",
		date: "NOVEMBER 2025",
		slug: "the-role-of-talent-in-venue-identity",
		src: "/1.webp",
		category: "Nightlife",
		tags: ["Nightlife", "Culture"],
		description: "The artists you book say more about your brand than your logo ever will.",
	},
	{
		title: "From Launch to Legacy",
		date: "OCTOBER 2025",
		slug: "from-launch-to-legacy",
		src: "/2.webp",
		category: "Trends",
		tags: ["Trends", "Strategy"],
		description: "Opening night is just the beginning. Here's how venues build lasting relevance.",
	},
];


//WORKS
type Project = {
	title: string;
	description: string;
	smallDescription: string;
	location: string;
	slug: string;
	src: string;
	year?: string;
};

export const projects: Project[] = [
	{
		title: "Groww",
		description: "Launch Video Campaign",
		smallDescription:
			"A high-energy campaign crafted to make the launch feel sharp, fast, and culturally current.",
		location: "Bengaluru, India",
		slug: "groww",
		src: "/1.webp",
	},
	{
		title: "Cult",
		description: "Smartwatch Launch Video",
		smallDescription:
			"A product storytelling piece built around motion, utility, and a bold fitness-first identity.",
		location: "Bengaluru, India",
		slug: "cult",
		src: "/2.webp",
	},
	{
		title: "Arovalis",
		description: "Brand Identity Design",
		smallDescription:
			"A visual language system designed to make the brand feel premium, distinct, and memorable.",
		location: "Bengaluru, India",
		slug: "arovalis",
		src: "/3.webp",
	},
	{
		title: "Pure Project",
		description: "Brand Identity & Packaging Design",
		smallDescription:
			"A packaging and identity direction focused on clarity, shelf presence, and long-term recall.",
		location: "Bengaluru, India",
		slug: "pure-project",
		src: "/4.webp",
	},
	{
		title: "Slice",
		description: "Feature Launch Commercial",
		smallDescription:
			"A feature-first launch film shaped to communicate speed, simplicity, and product confidence.",
		location: "Bengaluru, India",
		slug: "slice",
		src: "/5.webp",
	},
	{
		title: "MadDrop",
		description: "Website Design & Development",
		smallDescription:
			"A web experience built to feel immersive, responsive, and aligned with the brand’s voice.",
		location: "Bengaluru, India",
		slug: "maddrop",
		src: "/6.webp",
	},
];


//HORIZONTAL SCROLL MARQUEE
export const CARDS = [
	{
		title: "POCO",
		category: "Product Film",
		year: "2026",
	},
	{
		title: "Pure Project",
		category: "Brand Identity",
		year: "2026",
	},
	{
		title: "Groww",
		category: "Launch Campaign",
		year: "2026",
	},
	{
		title: "cult.",
		category: "Commercial",
		year: "2026",
	},
	{
		title: "prime video",
		category: "Motion System",
		year: "2026",
	},
	{
		title: "xiaomi",
		category: "Campaign Design",
		year: "2026",
	},
	{
		title: "POCO",
		category: "Visual Direction",
		year: "2026",
	},
	{
		title: "cult.",
		category: "Digital Launch",
		year: "2026",
	},
];