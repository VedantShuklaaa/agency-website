"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
	{
		question: "What kind of clients do you work with?",
		answer:
			"We work with startups, scale-ups, founders, agencies, and global brands across multiple industries.",
	},
	{
		question: "What services do you offer?",
		answer:
			"Branding, UI/UX design, web design, motion design, creative direction, and AI-enhanced creative systems.",
	},
	{
		question: "How do you price your projects?",
		answer:
			"Every project is scoped individually based on complexity, timeline, and deliverables.",
	},
	{
		question: "What is your typical project timeline?",
		answer:
			"Most projects range between 2–8 weeks depending on scope and feedback cycles.",
	},
	{
		question: "Do you accept one-off design tasks or only full projects?",
		answer:
			"We do both. We can support standalone design tasks or long-term engagements.",
	},
	{
		question: "How many concepts or revisions are included?",
		answer:
			"The exact number depends on the project, but we always include structured revision rounds.",
	},
];

export default function FAQAccordion() {
	const [active, setActive] = useState<number | null>(null);

	return (
		<section className="w-full font-twid">
			<div>
				{faqs.map((faq, index) => {
					const open = active === index;

					return (
						<div
							key={index}
							className="border-b border-black dark:border-zinc-800"
						>
							<button
								onClick={() => { setActive(open ? null : index) }}
								className="w-full px-4 py-8 flex items-center justify-between text-left"
							>
								<h3 className="text-2xl font-light">
									{faq.question}
								</h3>

								<motion.div
									animate={{ rotate: open ? 45 : 0 }}
									transition={{ duration: 0.25 }}
								>
									<Plus size={28} />
								</motion.div>
							</button>

							<AnimatePresence>
								{open && (
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
											duration: 0.4,
											ease: [0.76, 0, 0.24, 1],
										}}
										className="overflow-hidden"
									>
										<div className="max-w-4xl px-4 pb-10 text-xl text-zinc-500">
											{faq.answer}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					);
				})}
			</div>
		</section>
	);
}