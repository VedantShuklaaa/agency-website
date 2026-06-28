"use client";
import { useEffect, useRef } from "react";

export default function CursorDot() {
	const dotRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (window.matchMedia("(pointer: coarse)").matches) return;

		const moveCursor = (e: MouseEvent) => {
			if (!dotRef.current) return;
			dotRef.current.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
		};
		window.addEventListener("mousemove", moveCursor);
		return () => window.removeEventListener("mousemove", moveCursor);
	}, []);

	return (
		<div
			ref={dotRef}
			className="pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 rounded-full bg-[#FF0000] shadow-[0_0_20px_rgba(255,45,85,0.8)] hidden lg:block"
			style={{ willChange: "transform" }}
		/>
	);
}