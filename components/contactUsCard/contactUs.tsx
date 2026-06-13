"use client";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import Navlinks from "@/components/layout/navbar/navlinks";
import { motion } from "framer-motion";
import { NavLink } from "@/components/layout/navAnimation/navAnimation";


export default function ContactUs() {
	return (
		<div className="h-[107vh] w-full" id="contact">
			<div className="w-full flex items-center justify-between text-2xl text-black dark:text-zinc-400 border-b border-black dark:border-zinc-600 p-4">
				<span>© Get in touch</span>
				<span>(CAD® — 09)</span>
				<span>Studio Wrap</span>
			</div>

			<div className="h-[92vh] w-full grid grid-cols-2 font-onest">
				<div className="w-full h-full flex items-center justify-center p-4">
					<div className="h-[60vh] w-full flex flex-col gap-10">
						<div className="flex flex-col gap-1">
							<span className="text-7xl">Let’s create something amazing together!</span>
							<span className="text-xl text-black dark:text-zinc-400">Reach out we’d love to hear about your project and ideas.</span>
						</div>

						<div className="flex flex-col gap-2">
							<span className="text-5xl">Stay connected®</span>
							<Link href="/" className="text-2xl text-red-400 font-twid">contact@creativeapes.design</Link>
						</div>
					</div>
				</div>

				<div className="w-full h-full flex flex-col items-start justify-center ">
					<div className="h-[60vh] w-full p-4">
						<form className="flex flex-col gap-5">
							{/* Name */}
							<div className="relative">
								<input
									type="text"
									required
									placeholder="Name*"
									className="w-full py-4 rounded-[10px] border border-zinc-800 bg-transparent px-6 text-xl text-white transition-color duration-300 dark:text-white outline-none placeholder:text-black dark:placeholder:text-white focus:border-zinc-600 transition-colors"
								/>
							</div>

							{/* Email */}
							<div className="relative">
								<input
									type="email"
									required
									placeholder="Email*"
									className="w-full py-4 rounded-[10px] border border-zinc-800 bg-transparent px-6 text-xl text-white transition-color duration-300 dark:text-white outline-none placeholder:text-black dark:placeholder:text-white focus:border-zinc-600 transition-colors"
								/>
							</div>

							{/* Message */}
							<div className="relative">
								<textarea
									required
									placeholder="Message*"
									rows={6}
									className="w-full py-3 rounded-[10px] border border-zinc-800 bg-transparent p-6 text-xl text-white transition-color duration-300 dark:text-white outline-none resize-none placeholder:text-black dark:placeholder:text-white focus:border-zinc-600 transition-colors"
								/>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								className="mt-2 py-4 w-full rounded-[10px] bg-black dark:bg-white text-xl font-medium text-white dark:text-black transition-all duration-30 hover:bg-[#ff2d55] dark:hover:bg-[#ff2d55] transition-color duration-300"
							>
								Submit Now
							</button>

							<p className=" text-zinc-500">
								We typically respond within 1-2 business days.
							</p>
						</form>
					</div>

					<Link className="h-15 w-15 cursor-pointer rounded-full bg-black dark:bg-white hover:bg-[#ff2d55] dark:hover:bg-[#ff2d55] transition-color duration-300 flex items-center justify-center" href="#top">
						<ArrowUp className="text-white dark:text-black h-6 w-6" />
					</Link>
				</div>
			</div>

			<div className="h-[8vh] w-full border-b flex">
				<div className="h-full w-1/2 flex flex-col justify-between p-4">
					<span>Quick Links</span>
					<Navlinks />
				</div>

				<div className="h-full w-1/2 flex flex-col items-end justify-between p-4">
					<Socials />
					<span className="flex gap-1 items-center">
						<Link href="/">Privacy</Link>
						<div className="h-4 w-px bg-current opacity-30" />
						<Link href="/">Terms</Link>
					</span>
				</div>
			</div>
		</div>
	)
}


const navItems = ["Instagram", "LinkedIn", "Pintrest", "Behace"];

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

export function Socials() {
	return (
		<motion.div
			className="flex gap-2"
			variants={container}
			initial="hidden"
			animate="show"
		>
			{navItems.map((label, i) => (
				<motion.div
					key={label}
					variants={item}
					className="flex items-center text-black dark:text-zinc-400 hover:text-[#F04D5A] dark:hover:text-[#F04D5A]"
				>
					<NavLink text={label} />

					{i < navItems.length - 1 && (
						<span className="pointer-events-none">,</span>
					)}
				</motion.div>
			))}
		</motion.div>
	)
}