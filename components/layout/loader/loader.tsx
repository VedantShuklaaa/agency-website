"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { flushSync } from "react-dom";

interface LoaderProps {
	onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
	const loaderRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const bgRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		// timeline must be inside useGSAP
		const tl = gsap.timeline({ onComplete });

		tl.fromTo(
			textRef.current,
			{ y: "-100vh", opacity: 1 },
			{ y: "0vh", duration: 1.5, ease: "power3.out" }
		)
			.to(textRef.current, {
				y: "26.5vh",
				fontSize: "6vw",
				duration: 2,
				ease: "power3.inOut",
			})
			.to(bgRef.current, {
				opacity: 0,
				duration: 0.8,
				ease: "power2.inOut",
				pointerEvents: "none",
			});
	}, { scope: loaderRef, dependencies: [] });

	return (
		<div
			ref={loaderRef}
			className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
		>
			<div ref={bgRef} className="absolute inset-0 bg-background" />
			<div
				ref={textRef}
				className="relative z-10 text-white text-3xl font-twid font-medium whitespace-nowrap flex flex-col text-center leading-none"
			>
				<span>WILDBOYS TRIBE</span>
				<span>NIGHTLIFE & ENTERTAINMENT</span>
				<span>ARCHITECTS</span>
			</div>
		</div>
	);
}

export function LoaderWrapper({ children }: { children: React.ReactNode }) {
	const [loaded, setLoaded] = useState(false);

	return (
		<>
			{!loaded && (
				<Loader
					onComplete={() => {
						flushSync(() => setLoaded(true));
					}}
				/>
			)}
			{children}
		</>
	);
}