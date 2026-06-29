"use client";
import { useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import { headingClass } from "@/lib/constants";


interface LoaderProps {
	onComplete?: () => void;
	targetRef: React.RefObject<HTMLElement | null>;
}

export function Loader({ onComplete, targetRef }: LoaderProps) {
	const [scope, animate] = useAnimate();

	useEffect(() => {
		let mounted = true;

		const wait = (ms: number) =>
			new Promise((resolve) => setTimeout(resolve, ms));

		const run = async () => {
			if (!scope.current) return;

			await animate(
				scope.current,
				{
					y: [-500, 0],
					opacity: [0, 1],
					scale: [0.2, 0.2],
				},
				{
					duration: 1.1,
					ease: "easeOut",
				}
			);

			let tries = 0;
			while (!targetRef.current && tries < 20) {
				await wait(50);
				tries++;
			}

			if (!mounted || !scope.current || !targetRef.current) {
				onComplete?.();
				return;
			}

			const sourceRect = scope.current.getBoundingClientRect();
			const targetRect = targetRef.current.getBoundingClientRect();

			const sourceCenterX = sourceRect.left + sourceRect.width / 2;
			const sourceCenterY = sourceRect.top + sourceRect.height / 2;

			const targetCenterX = targetRect.left + targetRect.width / 2;
			const targetCenterY = targetRect.top + targetRect.height / 2;

			const deltaX = targetCenterX - sourceCenterX;
			const deltaY = targetCenterY - sourceCenterY;

			await animate(
				scope.current,
				{
					x: deltaX,
					y: deltaY,
					scale: 1,
				},
				{
					duration: 0.9,
					ease: [0.76, 0, 0.24, 1],
				}
			);

			await wait(80);
			onComplete?.();
		};

		run();

		return () => {
			mounted = false;
		};
	}, [animate, onComplete, scope, targetRef]);

	return (
		<motion.div
			className="fixed inset-0 z-[9999] bg-background"
			initial={{ opacity: 1 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.45, ease: "easeInOut" }}
		>
			<div
				className="flex w-full items-center justify-center px-4"
				style={{ height: "100dvh" }}
			>
				<motion.span
					ref={scope}
					className={headingClass}
					style={{
						willChange: "transform, opacity",
						opacity: 0,
						transformOrigin: "center center",
					}}
				>
					<span>WILDBOYS TRIBE</span>
				</motion.span>
			</div>
		</motion.div>
	);
}