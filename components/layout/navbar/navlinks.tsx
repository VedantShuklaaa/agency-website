"use client";
import { navItems } from "@/lib";
import { NavLink } from "../navAnimation/navAnimation";
import TransitionLink from "../pageTransition/transitionLink";

type NavbarLinksProps = {
	onLinkClick?: () => void;
};

export default function NavbarLinks({ onLinkClick }: NavbarLinksProps) {
	const firstHalf = navItems.slice(0, 4);
	const secondHalf = navItems.slice(4);

	return (
		<>
			{/* Desktop Navigation */}
			<div className="hidden items-center justify-center gap-8 lg:flex">
				<div className="flex items-center gap-2">
					{firstHalf.map((item, i) => (
						<div
							key={item.label}
							className="flex items-center text-black hover:text-[#F04D5A] dark:text-zinc-400 dark:hover:text-[#F04D5A]"
						>
							<TransitionLink href={item.href} onClick={onLinkClick}>
								<NavLink text={item.label} />
							</TransitionLink>

							{i < firstHalf.length - 1 && (
								<span className="pointer-events-none">,</span>
							)}
						</div>
					))}
				</div>

				<TransitionLink href="/" onClick={onLinkClick}>
					<div className="h-10 w-10 border border-black dark:border-white" />
				</TransitionLink>

				<div className="flex items-center gap-2">
					{secondHalf.map((item, i) => (
						<div
							key={item.label}
							className="flex items-center text-black hover:text-[#F04D5A] dark:text-zinc-400 dark:hover:text-[#F04D5A]"
						>
							<TransitionLink href={item.href} onClick={onLinkClick}>
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
						className="text-black hover:text-[#F04D5A] dark:text-zinc-400 dark:hover:text-[#F04D5A]"
					>
						<TransitionLink href={item.href} onClick={onLinkClick}>
							<NavLink text={item.label} />
						</TransitionLink>
					</div>
				))}
			</div>
		</>
	);
}