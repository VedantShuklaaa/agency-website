"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import Image from "next/image";

interface HoverRevealCardProps {
	topSrc: string;
	underSrc: string;
	alt: string;
	priority?: boolean;
	radius?: number;
}

export default function HoverRevealCard({
	topSrc,
	underSrc,
	alt,
	priority = false,
	radius = 180,
}: HoverRevealCardProps) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const [pos, setPos] = useState({ x: -9999, y: -9999 });
	const [hovering, setHovering] = useState(false);

	const handleMove = (e: React.MouseEvent) => {
		const rect = wrapRef.current?.getBoundingClientRect();
		if (!rect) return;
		setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	const maskStyle = hovering
		? {
			WebkitMaskImage: `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, transparent 99%, black 100%)`,
			maskImage: `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, transparent 99%, black 100%)`,
		}
		: {};

	return (
		<div
			ref={wrapRef}
			className="relative w-full h-full overflow-hidden rounded-2xl"
			style={{ cursor: hovering ? "none" : "default" }}
			onMouseMove={handleMove}
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
		>
			{/* Bottom (revealed) image */}
			<Image
				src={underSrc}
				alt={`${alt} underlying`}
				fill
				className="object-cover select-none pointer-events-none"
				sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
			/>

			{/* Top image with cursor-following mask */}
			<Image
				src={topSrc}
				alt={alt}
				fill
				priority={priority}
				className="object-cover select-none pointer-events-none transition-[mask-image,-webkit-mask-image] duration-150"
				sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
				style={maskStyle}
			/>

			<MorphBlobCursor x={pos.x} y={pos.y} visible={hovering} size={radius * 2} color="#ffffff" blendMode="difference" />

			<div
				className="pointer-events-none absolute text-xs uppercase tracking-widest text-white mix-blend-difference font-medium"
				style={{
					left: pos.x,
					top: pos.y,
					transform: "translate(-50%, -50%)",
					opacity: hovering ? 1 : 0,
				}}
			>
				View Project
			</div>
		</div>
	);
}

interface MorphBlobCursorProps {
	x: number;
	y: number;
	visible: boolean;
	size?: number;
	color?: string;
	blendMode?: React.CSSProperties["mixBlendMode"];
}

function MorphBlobCursor({
	x,
	y,
	visible,
	size = 200,
	color = "#ffffff",
	blendMode = "difference",
}: MorphBlobCursorProps) {
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	// position follows the cursor
	useGSAP(() => {
		if (!wrapperRef.current) return;
		gsap.to(wrapperRef.current, {
			x: x - size / 2,
			y: y - size / 2,
			duration: 0.5,
			ease: "power3.out",
			overwrite: "auto",
		});
	}, [x, y]);

	// fade/scale in or out based on hover state
	useGSAP(() => {
		if (!wrapperRef.current) return;
		gsap.to(wrapperRef.current, {
			opacity: visible ? 1 : 0,
			scale: visible ? 1 : 0.6,
			duration: 0.4,
			ease: "power3.out",
			overwrite: "auto",
		});
	}, [visible]);

	return (
		<div
			ref={wrapperRef}
			className="pointer-events-none absolute top-0 left-0"
			style={{ width: size, height: size, opacity: 0, mixBlendMode: blendMode }}
		>
			<svg viewBox="0 0 200 200" width="100%" height="100%">
				<circle cx="100" cy="100" r="70" fill={color} />
			</svg>
		</div>
	);
}