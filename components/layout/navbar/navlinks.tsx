"use client";
import { motion } from "framer-motion";
import { NavLink } from "../navAnimation/navAnimation";
import TransitionLink from "../pageTransition/transitionLink";

const navItems = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Work", href: "/work" },
	{ label: "Services", href: "/services" },
	{ label: "Community", href: "/community" },
	{ label: "Contact", href: "/contact" },
	{ label: "Blog", href: "/blog" },
	{ label: "Merch", href: "/merch" },
];

const container = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.08,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function Navlinks() {
	return (
		<motion.div
			className="flex gap-2"
			variants={container}
			initial="hidden"
			animate="show"
		>
			{navItems.map((label, i) => (
				<motion.div
					key={label.label}
					variants={item}
					className="flex items-center text-black dark:text-zinc-400 hover:text-[#F04D5A] dark:hover:text-[#F04D5A]"
				>
					<TransitionLink href={label.href}>
						<NavLink text={label.label} />
					</TransitionLink>

					{i < navItems.length - 1 && (
						<span className="pointer-events-none">,</span>
					)}
				</motion.div>
			))}
		</motion.div>
	)
}