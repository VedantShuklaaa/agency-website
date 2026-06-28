"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const Team = [
	{ name: "MARK", role: "Founder", image: "/1.webp" },
	{ name: "JASON", role: "Founding Partner", image: "/2.webp" },
	{ name: "MIRKO", role: "Designer", image: "/3.webp" },
	{ name: "ASHLEY", role: "Designer", image: "/4.webp" },
	{ name: "ZOEY", role: "Designer", image: "/5.webp" },
	{ name: "JEI", role: "Developer", image: "/6.webp" },
	{ name: "ZOEY", role: "Designer", image: "/5.webp" },
	{ name: "JEI", role: "Developer", image: "/6.webp" },
];

type WipeDirection = "topToBottom" | "bottomToTop";

export default function TeamSection() {
	const [displayedIdx, setDisplayedIdx] = useState<number | null>(null);
	const [direction, setDirection] = useState<WipeDirection>("topToBottom");
	const [open, setOpen] = useState(false);

	const hasRevealedOnce = useRef(false);

	const handleEnter = (idx: number) => {
		if (!hasRevealedOnce.current) {
			hasRevealedOnce.current = true;
			setDirection("topToBottom");
		} else {
			setDirection("bottomToTop");
		}
		setDisplayedIdx(idx);
		requestAnimationFrame(() => setOpen(true));
	};

	const handleLeaveAll = () => {
		setOpen(false);
	};

	const clipPath = (() => {
		if (open) return "inset(0% 0% 0% 0%)";
		return direction === "topToBottom"
			? "inset(0% 0% 100% 0%)"
			: "inset(100% 0% 0% 0%)";
	})();

	return (
		<div className="h-full w-full flex" onMouseLeave={handleLeaveAll}>
			{/* image column — hidden below lg, so it takes up NO width there */}
			<div className="hidden lg:flex h-full w-[30%] relative overflow-hidden">
				{displayedIdx !== null && (
					<div
						className="absolute inset-0 transition-[clip-path] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
						style={{ clipPath }}
					>
						<Image
							src={Team[displayedIdx].image}
							alt={Team[displayedIdx].name}
							fill
							className="object-cover p-4"
							sizes="30vw"
						/>
					</div>
				)}
			</div>

			<div className="h-full w-full lg:w-[70%]">
				{Team.map((item, idx) => (
					<div
						key={idx}
						onMouseEnter={() => handleEnter(idx)}
						className="group grid grid-cols-[1.1fr_1fr_24px] sm:grid-cols-[1fr_1fr_32px] lg:grid-cols-[1fr_1fr_40px] items-center gap-2 sm:gap-3 lg:gap-4 border-b border-white py-4 sm:py-5 lg:py-6 transition-all duration-300 hover:border-[#FF0000]"
					>
						{/* Name */}
						<h2 className="text-heading-sm sm:text-heading-lg lg:text-heading-xl leading-none transition-colors duration-300 group-hover:text-[#FF0000]">
							{item.name}
						</h2>

						<p className="text-body-sm sm:text-heading-md lg:text-heading-xl leading-tight transition-colors duration-300 group-hover:text-[#FF0000]">
							{item.role}
						</p>

						<div className="flex justify-end">
							<ArrowUpRight
								className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-[#FF0000] opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}