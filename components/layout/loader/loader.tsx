"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LoaderProps {
	onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
	const loaderRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const bgRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const tl = gsap.timeline({ onComplete });

		// 1. text starts above screen, slides to center
		tl.fromTo(
			textRef.current,
			{ y: "-100vh", opacity: 1 },
			{
				y: "0vh",
				duration: 1.5,
				ease: "power3.out",
			}
		)
			// 2. text grows + slides to bottom simultaneously
			.to(textRef.current, {
				y: "26vh",
				fontSize: "6vw",
				duration: 2,
				ease: "power3.inOut",
			})
			// 3. background panel slides up revealing page
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
			{/* background as separate layer */}
			<div
				ref={bgRef}
				className="absolute inset-0 bg-[background]"
			/>

			{/* text sits above bg, never moves in step 3 */}
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
	const router = useRouter();

	useEffect(() => {
		router.replace("/");
	}, []);

	return (
		<>
			{!loaded && <Loader onComplete={() => setLoaded(true)} />}
			{children}
		</>
	);
}