"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition() {
	const pathname = usePathname();

	const [firstLoad, setFirstLoad] = useState(true);

	useEffect(() => {
		setFirstLoad(false);
	}, []);

	return (
		<motion.div
			key={pathname}
			id="page-transition"
			initial={{ y: firstLoad ? "-100%" : "0%" }} 
			animate={{ y: "-100%" }}
			transition={{
				duration: 1,
				ease: [0.76, 0, 0.24, 1],
			}}
			className="fixed inset-0 bg-black z-[9999] pointer-events-none"
		/>
	);
}