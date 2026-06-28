"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AccordionItem {
	title: string;
	content: string;
}

interface AccordionProps {
	items: AccordionItem[];
}

export const accordionItems: AccordionItem[] = [
	{
		title: "CULTURE ATTRACTS",
		content:
			"People don't commit to campaigns. They commit to culture. The strongest venues become part of people's identity, giving people a reason to connect, engage, and return.",
	},
	{
		title: "COMMUNITY RETAINS",
		content:
			"Audiences attend. Communities return. Long-term demand is built through belonging, relationships, and a sense of shared ownership.",
	},
	{
		title: "CONSISTENCY COMPOUNDS",
		content:
			"One great experience creates attention. Consistency creates trust. People return when expectations are consistently met.",
	},
	{
		title: "SYSTEMS CREATE MOMENTUM",
		content:
			"Activities create motion. Systems create direction. Growth becomes repeatable when every part of the business works together toward the same outcome.",
	},
	{
		title: "EXECUTION DEFINES EVERYTHING",
		content:
			"Ideas create possibilities. Execution creates outcomes. The best strategies create value only when they are implemented consistently over time.",
	},
	{
		title: "PARTNERS, NOT VENDORS",
		content:
			"We don't work around the business. We work inside it. Meaningful results come from shared ownership, not outsourced responsibility.",
	},
];

export function Accordion({ items }: AccordionProps) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<div className="w-full border-t border-[#938ACF]">
			{items.map((item, index) => {
				const open = openIndex === index;

				return (
					<div key={item.title} className="border-b border-[#938ACF]">
						<button
							onClick={() => setOpenIndex(open ? null : index)}
							className="flex w-full items-center justify-between py-5 text-left"
						>
							<h2 className="lg:text-heading-xl p-2 text-[#938ACF]">{item.title}</h2>

							<div className="relative h-10 w-10 flex items-center justify-center">
								<motion.span
									animate={{ rotate: open ? 45 : 0 }}
									transition={{ duration: 0.35, ease: "easeInOut" }}
									className="absolute text-[#938ACF] text-2xl lg:text-6xl font-light leading-none"
								>
									+
								</motion.span>
							</div>
						</button>

						<AnimatePresence initial={false}>
							{open && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: "auto", opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.45, ease: "easeInOut" }}
									className="overflow-hidden"
								>
									<motion.p
										initial={{ y: 20 }}
										animate={{ y: 0 }}
										exit={{ y: -20 }}
										transition={{ duration: 0.35 }}
										className="max-w-5xl pb-5 text-heading-lg text-[#938ACF]"
									>
										{item.content}
									</motion.p>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				);
			})}
		</div>
	);
}