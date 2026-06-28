"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

export default function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();

	const mounted = useSyncExternalStore(
		() => () => { },
		() => true,
		() => false
	);

	if (!mounted) return null;

	const isDark = resolvedTheme === "dark";

	return (
		<motion.button
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			style={{
				width: 58,
				height: 31,
				borderRadius: 999,
				background: "#FF0000",
				border: "none",
				cursor: "pointer",
				padding: 4,
				display: "inline-flex",
				alignItems: "center",
				outline: "none",
				flexShrink: 0,
			}}
		>
			<motion.div
				animate={{ x: isDark ? 25 : 0 }}
				transition={{ type: "spring", stiffness: 500, damping: 32, mass: 0.8 }}
				style={{
					width: 26,
					height: 26,
					borderRadius: "50%",
					background: "white",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexShrink: 0,
					boxShadow: "0 2px 12px rgba(240,77,90,0.4)",
				}}
			>
				<AnimatePresence mode="wait" initial={false}>
					{isDark ? (
						<motion.span
							key="moon"
							initial={{ rotate: -30, scale: 0.5, opacity: 0 }}
							animate={{ rotate: 0, scale: 1, opacity: 1 }}
							exit={{ rotate: 30, scale: 0.5, opacity: 0 }}
							transition={{ duration: 0.2, ease: "easeOut" }}
							style={{ display: "flex", alignItems: "center" }}
						>
							<Moon size={16} color="#F04D5A" fill="#ff2d55" />
						</motion.span>
					) : (
						<motion.span
							key="sun"
							initial={{ rotate: 30, scale: 0.5, opacity: 0 }}
							animate={{ rotate: 0, scale: 1, opacity: 1 }}
							exit={{ rotate: -30, scale: 0.5, opacity: 0 }}
							transition={{ duration: 0.2, ease: "easeOut" }}
							style={{ display: "flex", alignItems: "center" }}
						>
							<Sun size={16} color="#F04D5A" fill="#ff2d55" />
						</motion.span>
					)}
				</AnimatePresence>
			</motion.div>
		</motion.button>
	);
}