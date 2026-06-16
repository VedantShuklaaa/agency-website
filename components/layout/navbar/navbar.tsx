"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/theme/theme-button";
import LiveTime from "./time";
import Navlinks from "./navlinks";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const navbarRef = useRef<HTMLDivElement>(null);
	const isOpenRef = useRef(false);

	useEffect(() => { isOpenRef.current = isOpen }, [isOpen]);

	useGSAP(() => {
		if (!navbarRef.current) return;

		let lastScrollY = window.scrollY;
		let isHidden = false;

		const handleScroll = () => {
			if (isOpenRef.current) return;

			const currentScrollY = window.scrollY;

			// Always show near top
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

			// Scroll down
			if (delta > 10 && !isHidden) {
				gsap.to(navbarRef.current, {
					yPercent: -100,
					duration: 0.4,
					ease: "power3.out",
				});

				isHidden = true;
			}

			// Scroll up
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
	}, { scope: navbarRef });

	useEffect(() => {
		if (isOpen && navbarRef.current) {
			gsap.to(navbarRef.current, {
				yPercent: 0,
				duration: 0.3,
				ease: "power3.out",
			});
		}
	}, [isOpen]);

	return (
		<div
			ref={navbarRef}
			className="fixed top-0 left-0 z-[100] h-20 w-full bg-[background] border-b border-black dark:border-zinc-700 flex items-center justify-between px-4 lg:px-5 font-onest"
		>
			{/* Logo */}
			<div className="text-lg sm:text-xl lg:text-xl flex items-center gap-2 text-black dark:text-white leading-none font-[700]">
				<div className="h-10 w-10 lg:h-12 lg:w-12 border border-black dark:border-white lg:hidden" />

				<div className="flex flex-col">
					<h1>WILDBOY</h1>
					<h1>TRIBES</h1>
				</div>
			</div>


			<Navlinks />

			{/* Desktop Navigation */}
			<div className="hidden lg:flex items-center gap-4 lg:gap-25">
				<div className="flex flex-col">
					<div className="flex gap-2">
						<span className="text-black dark:text-white text-sm">
							Based in India
						</span>

						<span className="text-xs flex items-end text-red-500">
							<LiveTime />
						</span>
					</div>

					<div className="text-black dark:text-zinc-400">
						<p>AI-First Creative Solutions</p>
					</div>
				</div>

				<ThemeToggle />
			</div>

			{/* Mobile Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="lg:hidden text-black dark:text-white"
			>
				{isOpen ? <X size={28} /> : <Menu size={28} />}
			</button>

			{/* Mobile Menu */}
			<motion.div
				initial={false}
				animate={{
					opacity: isOpen ? 1 : 0,
					y: isOpen ? 0 : -10,
					pointerEvents: isOpen ? "auto" : "none",
				}}
				transition={{ duration: 0.25 }}
				className="absolute top-20 left-0 w-full bg-white dark:bg-black border-b border-black dark:border-zinc-700 lg:hidden z-50"
			>
				<div className="flex flex-col items-center p-6 gap-6">
					<Navlinks />

					<div className="border-t border-zinc-300 dark:border-zinc-700 pt-6">
						<ThemeToggle />
					</div>
				</div>
			</motion.div>
		</div>
	);
}