"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BottomDesc from "../layout/bottomDesc/bottomDesc";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
	{
		tag: "01 / Origin",
		title: "Built from quiet obsession",
		body: "Every great object starts as a stubborn idea that refuses to leave. We chase those.",
		accent: "oklch(0.78 0.17 60)",
	},
	{
		tag: "02 / Craft",
		title: "Hand-tuned, machine-precise",
		body: "Edges measured in microns. Curves measured in feeling. Both matter equally here.",
		accent: "oklch(0.74 0.16 25)",
	},
	{
		tag: "03 / Material",
		title: "Honest weight in the palm",
		body: "Anodized aluminum, brushed steel, vegetable-tanned leather. Materials that age with you.",
		accent: "oklch(0.7 0.18 145)",
	},
	{
		tag: "04 / Motion",
		title: "Movement as a language",
		body: "Nothing snaps. Nothing jitters. Every transition carries intent and rests on a curve.",
		accent: "oklch(0.72 0.18 280)",
	},
	{
		tag: "05 / Sound",
		title: "The click you remember",
		body: "Acoustic engineering for a single satisfying moment — the close, the latch, the lock.",
		accent: "oklch(0.78 0.14 200)",
	},
	{
		tag: "06 / Light",
		title: "Designed in raking shadow",
		body: "We render the world at 7am and 7pm. If it survives both lights, it ships.",
		accent: "oklch(0.8 0.16 90)",
	},
	{
		tag: "07 / Field",
		title: "Tested where it hurts",
		body: "Salt spray, sub-zero mornings, three-meter drops onto granite. Then we test it again.",
		accent: "oklch(0.68 0.2 15)",
	},
	{
		tag: "08 / Release",
		title: "Out the door, into use",
		body: "The product is not finished when it leaves us. It is finished when it lives with you.",
		accent: "oklch(0.75 0.15 320)",
	},
];

const PILE_GAP = 6;       // px between cards in stack (edge peeking)
const PILE_MARGIN = 60;   // distance from top/bottom of stage

export function FlipStack() {
	const containerRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	useGSAP(() => {
		const segment = 1 / CARDS.length;
		const stageWidth = stageRef.current?.offsetWidth ?? 560;

		// X position for a card in the BOTTOM (left) pile
		// slot 0 = front card (rightmost, next to flip)
		// each slot moves left by PILE_GAP
		const bottomSlotX = (slot: number) =>
			-stageWidth / 2 + PILE_MARGIN + slot * PILE_GAP;

		// X position for a card in the TOP (right) pile
		// slot 0 = first card to arrive (leftmost)
		const topSlotX = (slot: number) =>
			stageWidth / 2 - PILE_MARGIN - slot * PILE_GAP;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: containerRef.current,
				start: "top top",
				end: `+=${CARDS.length * 100}%`,
				pin: true,
				scrub: true,
			},
		});

		CARDS.forEach((_, index) => {
			const card = cardRefs.current[index];
			if (!card) return;

			const start = index * segment;
			const flipEnd = start + segment * 0.6;
			const exitEnd = start + segment;

			// Initial position: left pile, slot = index (0 = front)
			gsap.set(card, {
				x: bottomSlotX(index),
				y: 0,
				z: 0,
				rotateY: 0,
				opacity: 1,
			});

			// Reflow: as front card leaves, remaining cards shift right (slot decreases)
			if (index < CARDS.length - 1) {
				for (let later = index + 1; later < CARDS.length; later++) {
					const laterCard = cardRefs.current[later];
					if (!laterCard) continue;
					const newSlot = later - index - 1;
					tl.to(
						laterCard,
						{
							x: bottomSlotX(newSlot),
							duration: flipEnd - start,
							ease: "none",
						},
						start
					);
				}
			}

			// Flip up through center: left pile → center (rotateY 90, card face shows) → rotateY 180
			// Also arc upward via y so it doesn't clip other cards
			tl.to(
				card,
				{
					x: 0,
					y: -80,   // arc up through center
					z: 60,
					rotateY: 180,
					duration: flipEnd - start,
					ease: "none",
				},
				start
			);

			// Settle into right pile
			tl.to(
				card,
				{
					x: topSlotX(index),
					y: 0,
					z: 0,
					duration: exitEnd - flipEnd,
					ease: "none",
				},
				flipEnd
			);
		});
	}, { scope: containerRef, dependencies: [] });

	return (
		<div className="min-h-screen w-full bg-background text-[oklch(0.97_0.01_90)] overflow-x-hidden">
			<div ref={containerRef} className="relative h-screen">
				<div className="sticky top-0 h-screen w-full overflow-hidden">
					{/* Background text */}
					<div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
						<div className="text-center text-display-xl tracking-tight leading-none font-august">
							<h1>WE DON&apos;T CREATE HYPE,</h1>
							<h1>WE CREATE DEMAND.</h1>
							<h1>HYPE FILLS A NIGHT,</h1>
							<h1>DEMAND BUILDS A BUSINESS.</h1>
						</div>
					</div>

					{/* 3D stage — horizontal, full width */}
					<div
						className="absolute inset-0 flex items-center justify-center"
						style={{ perspective: "2000px" }}
					>
						<div
							ref={stageRef}
							className="relative"
							style={{
								width: "min(900px, 92vw)",   
								height: "min(480px, 70vh)",
								transformStyle: "preserve-3d",
							}}
						>
							{CARDS.map((card, i) => (
								<Card
									key={i}
									index={i}
									total={CARDS.length}
									cardRef={(el) => (cardRefs.current[i] = el)}
									{...card}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

interface CardProps {
	index: number;
	total: number;
	tag: string;
	title: string;
	body: string;
	accent: string;
	cardRef: (el: HTMLDivElement | null) => void;
}

function Card({ index, total, tag, title, body, accent, cardRef }: CardProps) {
	return (
		<div
			ref={cardRef}
			className="absolute"
			style={{
				// centered vertically, width = card width
				width: "min(340px, 75vw)",
				height: "min(460px, 65vh)",
				top: "50%",
				left: "50%",
				marginTop: "calc(min(460px, 65vh) / -2)",
				marginLeft: "calc(min(340px, 75vw) / -2)",
				transformStyle: "preserve-3d",
				zIndex: total - index,
			}}
		>
			{/* FRONT */}
			<div
				className="absolute inset-0 rounded-3xl overflow-hidden border"
				style={{
					backfaceVisibility: "hidden",
					background:
						"linear-gradient(160deg, oklch(0.22 0.03 265) 0%, oklch(0.16 0.02 265) 100%)",
					borderColor: "oklch(0.35 0.04 265)",
					boxShadow: `0 30px 60px -20px oklch(0 0 0 / 0.6), inset 0 1px 0 oklch(1 0 0 / 0.06)`,
				}}
			>
				<div className="absolute top-0 left-0 right-0 h-1" style={{ background: accent }} />
				<div className="p-8 h-full flex flex-col justify-between">
					<div>
						<div className="text-[10px] uppercase tracking-[0.35em] mb-6" style={{ color: accent }}>
							{tag}
						</div>
						<div
							className="font-black leading-[0.95] tracking-tighter"
							style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: "oklch(0.95 0.02 90)" }}
						>
							{String(index + 1).padStart(2, "0")}
						</div>
					</div>
					<div className="text-xs uppercase tracking-[0.3em] text-[oklch(0.55_0.03_265)]">
						scroll to flip
					</div>
				</div>
			</div>

			{/* BACK */}
			<div
				className="absolute inset-0 rounded-3xl overflow-hidden border p-8 flex flex-col justify-between"
				style={{
					backfaceVisibility: "hidden",
					transform: "rotateY(180deg)",   // rotateY now (horizontal flip)
					background:
						"linear-gradient(160deg, oklch(0.96 0.02 90) 0%, oklch(0.88 0.03 80) 100%)",
					borderColor: "oklch(0.7 0.05 80)",
					color: "oklch(0.18 0.02 265)",
					boxShadow: `0 30px 60px -20px oklch(0 0 0 / 0.6)`,
				}}
			>
				<div>
					<div className="text-[10px] uppercase tracking-[0.35em] mb-4" style={{ color: accent }}>
						{tag}
					</div>
					<h3
						className="font-semibold tracking-tight leading-tight"
						style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)" }}
					>
						{title}
					</h3>
				</div>
				<p className="text-sm md:text-base leading-relaxed text-[oklch(0.35_0.02_265)]">
					{body}
				</p>
				<div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-[oklch(0.45_0.02_265)]">
					<span>Card {index + 1} of {total}</span>
					<span style={{ color: accent }}>●</span>
				</div>
			</div>
		</div>
	);
}

export default function HoverCards() {
	return (
		<div className="min-h-screen w-full flex flex-col justify-between items-center border-b border-zinc-100 dark:border-zinc-900">
			<div />
			<FlipStack />
			<BottomDesc
				text1="© Featured Projects"
				text2="(CAD® — 04)"
				text3="Digital Showcase"
				className="text-black dark:text-zinc-400"
			/>
		</div>
	);
}