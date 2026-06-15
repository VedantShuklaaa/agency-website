"use client";
import { Skiper49 } from "@/components/layout/skipper/skipper2";
import { motion } from "framer-motion";


export default function Page() {
	return (
		<div className="w-full bg-[background]">
			<div className="h-[80vh] w-full flex flex-col items-center pt-10 font-twid leading-none bg-purple-300 text-black">
				<span className="text-[200px] tracking-tight">BLOGS</span>
				<span className="text-xl text-zinc-600">Expert perspectives, industry trends, and practical wisdom.</span>

				<Skiper49 />
			</div>

			<div className="w-full flex flex-col p-4 gap-2 font-twid">
				{blogs.map((items, idx) => (
					<motion.div
						key={idx}
						className="h-[25vh] w-full flex"
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						initial={{ opacity: 0, y: 120 }}
						transition={{
							duration: 1,
							delay: idx * 0.2,
							ease: [0.16, 1, 0.3, 1],
						}}
					>
						<div className="h-full w-[15%] border border-black dark:border-zinc-600" />

						<div className="h-full w-[80%] p-4 flex flex-col gap-2">
							<span className="text-zinc-400 text-xl">
								{items.date}
							</span>

							<span className="text-4xl">
								{items.title}
							</span>

							<span className="text-2xl text-zinc-500 h-full w-[50%]">
								{items.description}
							</span>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	)
}

const blogs = [
	{
		date: "SEP 12, 2023",
		title: "4 Ways to Elevate Your Designs With Authentic Photos",
		description:
			"Four ways designers can push themselves when deciding which photos to place in their projects, presentations, and pitches.",
	},
	{
		date: "AUG 29, 2023",
		title: "How to make (and keep) money as a freelance designer",
		description:
			"Use this guide to establish strong practices and automate recurring processes so you can consistently grow your business and revenue over time.",
	},
	{
		date: "AUG 25, 2023",
		title: "The Remarkable Evolution of the Drawing Tablet: Why Designers Should Ditch the Mouse",
		description:
			"The artist's tools have seen radical transformations from the ancient caves of Lascaux to modern digital canvases.",
	},
	{
		date: "JUN 29, 2023",
		title: "A guide to mastering financial security: 5 tips from freelancing experts",
		description:
			"Get actionable tips and lessons learned from financial experts who specialize in assisting freelancers and entrepreneurs!",
	},
	{
		date: "JUN 27, 2023",
		title: "This BIG mistake could cost you your job as a UX designer",
		description:
			"Learn how to avoid the biggest pitfall in UX design. (Hint: It's not just about the client.)",
	},
];