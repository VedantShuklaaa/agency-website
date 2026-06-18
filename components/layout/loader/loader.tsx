"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { headingClass } from "@/lib/constants";

interface LoaderProps {
	onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {

	console.log("loader animation");
	const loaderRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const tl = gsap.timeline();

		tl.fromTo(
			textRef.current,
			{
				y: -500,
				scale: 0.2,
				opacity: 1,
			},
			{
				y: 0,
				scale: 0.6,
				duration: 1.2,
				ease: "power3.out",
			}
		)
			.to(textRef.current, {
				y: 250,
				scale: 1,
				duration: 1.8,
				ease: "power2.inOut",
			})

		return () => {
			tl.kill();
		};
	}, {
		scope: loaderRef,
		dependencies: []
	});

	return (
		<div
			ref={textRef}
			className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
		>
			<div
				className={headingClass}
			>
				<span>WILDBOYS TRIBE</span>
				<span>NIGHTLIFE & ENTERTAINMENT ARCHITECTS</span>
			</div>
		</div>
	);
}

export function LoaderWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [loaded, setLoaded] = useState(false);

	return (
		<>
			{!loaded && (
				<Loader
					onComplete={() => {
						setLoaded(true);
					}}
				/>
			)}
			{children}
		</>
	);
}