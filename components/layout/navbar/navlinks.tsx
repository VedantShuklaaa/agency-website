"use client";
import { navItems } from "@/lib";
import { NavLink } from "../navAnimation/navAnimation";
import TransitionLink from "../pageTransition/transitionLink";

export default function NavbarLinks() {
	const firstHalf = navItems.slice(0, 4);
	const secondHalf = navItems.slice(4);

	return (
		<>
			{/* Desktop Navigation */}
			<div className="hidden lg:flex items-center justify-center gap-8">
				<div className="flex items-center gap-2">
					{firstHalf.map((item, i) => (
						<div
							key={item.label}
							className="flex items-center text-black dark:text-zinc-400 hover:text-[#F04D5A] dark:hover:text-[#F04D5A]"
						>
							<TransitionLink href={item.href}>
								<NavLink text={item.label} />
							</TransitionLink>

							{i < firstHalf.length - 1 && (
								<span className="pointer-events-none">,</span>
							)}
						</div>
					))}
				</div>

				<TransitionLink href="/">
					<div className="h-10 w-10 border border-black dark:border-white">

					</div>
				</TransitionLink>

				<div className="flex items-center gap-2">
					{secondHalf.map((item, i) => (
						<div
							key={item.label}
							className="flex items-center text-black dark:text-zinc-400 hover:text-[#F04D5A] dark:hover:text-[#F04D5A]"
						>
							<TransitionLink href={item.href}>
								<NavLink text={item.label} />
							</TransitionLink>

							{i < secondHalf.length - 1 && (
								<span className="pointer-events-none">,</span>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Mobile / Tablet Navigation */}
			<div className="flex flex-col items-center justify-center gap-4 text-center lg:hidden">
				{navItems.map((item) => (
					<div
						key={item.label}
						className="text-black dark:text-zinc-400 hover:text-[#F04D5A] dark:hover:text-[#F04D5A]"
					>
						<TransitionLink href={item.href}>
							<NavLink text={item.label} />
						</TransitionLink>
					</div>
				))}
			</div>
		</>
	);
}