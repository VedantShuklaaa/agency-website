"use client";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { navItems } from "@/lib";
import { NavLink } from "@/components/layout/navAnimation/navAnimation";
import TransitionLink from "../layout/pageTransition/transitionLink";

const socialItems = ["Instagram", "LinkedIn", "Pinterest", "Behance"];

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
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: "easeOut" as const,
		},
	},
};

const inputStyles = "w-full rounded-[10px] border border-zinc-800 bg-transparent px-4 md:px-6 py-3 md:py-4 text-base md:text-lg lg:text-xl text-black dark:text-white outline-none transition-colors duration-300 placeholder:text-black dark:placeholder:text-white focus:border-zinc-600";

export default function ContactUs() {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<section
			id="contact"
			className="w-full min-h-screen font-onest"
		>
			<div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] gap-10 lg:gap-0">
				{/* Left */}
				<div className="flex items-center justify-center p-6 lg:p-10">
					<div className="w-full flex flex-col gap-10">
						<div className="flex flex-col gap-3">
							<h2 className="text-3xl md:text-5xl lg:text-6xl leading-tight">
								Let’s create something amazing together!
							</h2>

							<p className="text-lg md:text-xl text-black dark:text-zinc-400">
								Reach out — we’d love to hear about your project and ideas.
							</p>
						</div>

						<div className="flex flex-col gap-2">
							<span className="text-3xl md:text-4xl lg:text-5xl">
								Stay connected®
							</span>

							<Link
								href="mailto:contact@creativeapes.design"
								className="text-lg md:text-xl lg:text-2xl text-[#F04D5A] font-twid break-all"
							>
								contact@creativeapes.design
							</Link>
						</div>
					</div>
				</div>

				{/* Right */}
				<div className="flex items-center justify-center p-6 lg:p-10">
					<div className="w-full flex flex-col gap-8">
						<form
							onSubmit={handleSubmit}
							className="flex flex-col gap-5"
						>
							<label htmlFor="name" className="sr-only">
								Name
							</label>

							<InputField
								id="name"
								type="text"
								placeholder="Name*"
							/>

							<label htmlFor="email" className="sr-only">
								Email
							</label>

							<InputField
								id="email"
								type="email"
								placeholder="Email*"
							/>

							<label htmlFor="message" className="sr-only">
								Message
							</label>

							<textarea
								id="message"
								required
								rows={6}
								placeholder="Message*"
								className={`${inputStyles} resize-none`}
							/>

							<button
								type="submit"
								className="mt-2 w-full rounded-[10px] bg-black dark:bg-white py-4 text-xl font-medium text-white dark:text-black transition-colors duration-300 hover:bg-[#F04D5A] dark:hover:bg-[#F04D5A]"
							>
								Submit Now
							</button>

							<p className="text-zinc-500">
								We typically respond within 1–2 business days.
							</p>
						</form>

						<div className="flex justify-start">
							<Link
								href="#top"
								className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-black dark:bg-white transition-colors duration-300 hover:bg-[#F04D5A] dark:hover:bg-[#F04D5A]"
							>
								<ArrowUp className="h-4 w-4 md:h-5 md:w-5 text-white dark:text-black" />
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className="border-b">
				<div className="flex flex-col gap-6 p-4 md:p-6 lg:flex-row lg:justify-between lg:gap-0">
					<div className="flex flex-col">
						<span className="text-sm uppercase tracking-wide text-zinc-500">
							Quick Links
						</span>

						<BottomLinks />
					</div>

					<div className="flex flex-col lg:items-end">
						<Socials />

						<span className="flex flex-wrap items-center gap-3 text-sm md:text-base">
							<Link href="/">Privacy</Link>
							<div className="h-4 w-px bg-current opacity-30" />
							<Link href="/">Terms</Link>
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}

export function Socials() {
	return (
		<div className="flex flex-wrap gap-x-2 gap-y-1 text-sm md:text-base lg:text-lg">
			{socialItems.map((label, i) => (
				<div
					key={label}
					className="flex items-center text-black dark:text-zinc-400 hover:text-[#F04D5A]"
				>
					<NavLink text={label} />
					{i < socialItems.length - 1 && ","}
				</div>
			))}
		</div>
	);
}

export function BottomLinks() {
	return (
		<motion.div
			className="flex flex-wrap gap-x-2 gap-y-1 text-sm md:text-base lg:text-lg"
			variants={container}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.3 }}
		>
			{navItems.map((link, i) => (
				<motion.div
					key={link.label}
					variants={item}
					className="flex items-center text-black dark:text-zinc-400 hover:text-[#F04D5A] dark:hover:text-[#F04D5A]"
				>
					<TransitionLink href={link.href}>
						<NavLink text={link.label} />
					</TransitionLink>

					{i < navItems.length - 1 && (
						<span className="pointer-events-none">,</span>
					)}
				</motion.div>
			))}
		</motion.div>
	);
}


type LinkItem = {
	label: string;
	href?: string;
};

function AnimatedLinks({
	items,
	isTransition = false,
}: {
	items: LinkItem[];
	isTransition?: boolean;
}) {
	return (
		<motion.div
			variants={container}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			className="flex flex-wrap gap-x-2 gap-y-1"
		>
			{items.map((link, i) => (
				<motion.div
					key={link.label}
					variants={item}
					className="flex items-center"
				>
					{isTransition ? (
						<TransitionLink href={link.href!}>
							<NavLink text={link.label} />
						</TransitionLink>
					) : (
						<NavLink text={link.label} />
					)}

					{i < items.length - 1 && ","}
				</motion.div>
			))}
		</motion.div>
	);
}

function InputField({
	id,
	type,
	placeholder,
}: {
	id: string;
	type: string;
	placeholder: string;
}) {
	return (
		<>
			<label htmlFor={id} className="sr-only">
				{placeholder}
			</label>

			<input
				id={id}
				type={type}
				autoComplete={id}
				required
				placeholder={placeholder}
				className={inputStyles}
			/>
		</>
	);
}