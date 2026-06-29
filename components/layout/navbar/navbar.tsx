"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme/theme-button";
import LiveTime from "./time";
import Navlinks from "./navlinks";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const pathname = usePathname();
	const previousPathname = useRef(pathname);
	const navbarRef = useRef<HTMLDivElement>(null);
	const isOpenRef = useRef(false);

	useEffect(() => {
		isOpenRef.current = isOpen;
	}, [isOpen]);

	useEffect(() => {
		if (previousPathname.current !== pathname) {
			setIsOpen(false);
			previousPathname.current = pathname;
		}
	}, [pathname]);

	useGSAP(
		() => {
			if (!navbarRef.current) return;

			let lastScrollY = window.scrollY;
			let isHidden = false;

			const handleScroll = () => {
				if (isOpenRef.current) return;

				const currentScrollY = window.scrollY;

				if (currentScrollY < 50) {
					if (isHidden) {
						gsap.to(navbarRef.current, {
							yPercent: 0,
							duration: 0.4,
							ease: "power3.out",
						});
						isHidden = false;
					}

					lastScrollY = currentScrollY;
					return;
				}

				const delta = currentScrollY - lastScrollY;

				if (delta > 10 && !isHidden) {
					gsap.to(navbarRef.current, {
						yPercent: -100,
						duration: 0.4,
						ease: "power3.out",
					});
					isHidden = true;
				}

				if (delta < -10 && isHidden) {
					gsap.to(navbarRef.current, {
						yPercent: 0,
						duration: 0.4,
						ease: "power3.out",
					});
					isHidden = false;
				}

				lastScrollY = currentScrollY;
			};

			window.addEventListener("scroll", handleScroll);

			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		},
		{ scope: navbarRef }
	);

	useEffect(() => {
		if (isOpen && navbarRef.current) {
			gsap.to(navbarRef.current, {
				yPercent: 0,
				duration: 0.3,
				ease: "power3.out",
			});
		}
	}, [isOpen]);

	const closeMenu = () => setIsOpen(false);

	return (
		<div
			ref={navbarRef}
			className="fixed top-0 left-0 z-[100] flex h-20 w-full items-center justify-between border-b border-zinc-100 bg-background px-4 font-onest dark:border-zinc-900 lg:px-5"
		>
			<div />

			<div className="hidden items-center justify-center lg:flex">
				<Navlinks />
			</div>

			<div className="hidden items-center gap-4 lg:flex xl:gap-25">
				<div className="flex flex-col">
					<div className="flex gap-2">
						<span className="text-sm text-black dark:text-white">
							Based in India
						</span>
						<span className="flex items-end text-xs text-[#FF0000]">
							<LiveTime />
						</span>
					</div>

					<div className="text-black dark:text-zinc-400">
						<p>Nightlife and Entertainment Architects</p>
					</div>
				</div>

				<ThemeToggle />
			</div>

			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="text-black dark:text-white lg:hidden"
				aria-label={isOpen ? "Close menu" : "Open menu"}
			>
				{isOpen ? <X size={28} /> : <Menu size={28} />}
			</button>

			<motion.div
				initial={false}
				animate={{
					opacity: isOpen ? 1 : 0,
					y: isOpen ? 0 : -10,
					pointerEvents: isOpen ? "auto" : "none",
				}}
				transition={{ duration: 0.25 }}
				className="absolute top-20 left-0 z-50 w-full border-b border-black bg-white dark:border-zinc-700 dark:bg-black lg:hidden"
			>
				<div className="flex flex-col items-center gap-6 p-6">
					<Navlinks onLinkClick={closeMenu} />

					<div className="border-t border-zinc-300 pt-6 dark:border-zinc-700">
						<ThemeToggle />
					</div>
				</div>
			</motion.div>
		</div>
	);
}