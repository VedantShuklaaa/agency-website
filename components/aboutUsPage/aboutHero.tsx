"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import TiltCard from "@/components/layout/tiltCard/tiltCard";
import { Accordion, accordionItems } from "@/components/aboutUsPage/accordion";

gsap.registerPlugin(ScrollTrigger);

const LINE_1 = "ONE GREAT EXPERIENCE IS LUCK,";
const LINE_2 = "ONE HUNDRED GREAT EXPERIENCES IS A SYSTEM.";
const COL_1 = "WE DONT'T CHASE MOMENTS,";
const COL_2 = "WE BUILD THEM.";
const SUB = "CULTURE. COMMUNITY. CONSISTENCY.";

const CARD_IMAGES = ["/1.webp", "/2.webp", "/3.webp", "/4.webp", "/5.webp", "/6.webp"];

export default function AboutHero() {
	const containerRef = useRef<HTMLDivElement>(null);
	const introRef = useRef<HTMLDivElement>(null);
	const bottomTextRef = useRef<HTMLDivElement>(null);
	const col1Ref = useRef<HTMLDivElement>(null);
	const col2Ref = useRef<HTMLDivElement>(null);
	const subRef = useRef<HTMLDivElement>(null);
	const secondSectionRef = useRef<HTMLDivElement>(null);

	// clock refs
	const dialRef = useRef<HTMLDivElement>(null);
	const arm1Ref = useRef<HTMLDivElement>(null);
	const arm2Ref = useRef<HTMLDivElement>(null);
	const circleRef = useRef<HTMLDivElement>(null);
	const clockStageRef = useRef<HTMLDivElement>(null);

	const finalSectionRef = useRef<HTMLDivElement>(null);
	const leftRef = useRef<HTMLDivElement>(null);
	const rightRef = useRef<HTMLDivElement>(null);

	const textPageRef = useRef<HTMLDivElement>(null);
	const cardsPageRef = useRef<HTMLDivElement>(null);
	const cardsRowRef = useRef<HTMLDivElement>(null);

	const accordionSectionRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const line1Letters = gsap.utils.toArray<HTMLElement>(".line-1 .letter");
			const line2Letters = gsap.utils.toArray<HTMLElement>(".line-2 .letter");

			gsap.set([...line1Letters, ...line2Letters], { y: 60, opacity: 0 });
			gsap.to(line1Letters, { y: 0, opacity: 1, duration: 0.8, ease: "power4.out", stagger: 0.035 });
			gsap.to([...line2Letters].reverse(), { y: 0, opacity: 1, duration: 0.8, ease: "power4.out", stagger: 0.045 });

			gsap.set(bottomTextRef.current, { y: 40, opacity: 0 });

			gsap.set([col1Ref.current, col2Ref.current], { y: 80, opacity: 0 });
			gsap.set(subRef.current, { y: 40, opacity: 0 });
			gsap.set([secondSectionRef.current, clockStageRef.current, finalSectionRef.current, cardsPageRef.current], {
				opacity: 0,
			});
			gsap.set(leftRef.current, { opacity: 0, x: -100 });
			gsap.set(rightRef.current, { opacity: 0, x: 100 });
			gsap.set(accordionSectionRef.current, { yPercent: 100 });

			gsap.to(bottomTextRef.current, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: "power4.out",
				delay: 0.6,
			});

			const clock = { grow: 0, angle: 0, scale: 1, bg: 0, arm2: 0 };

			const applyClock = () => {
				if (arm1Ref.current)
					arm1Ref.current.style.transform = `translate(-50%, 0) scaleY(${clock.grow})`;
				if (arm2Ref.current)
					arm2Ref.current.style.transform = `translate(-50%, 0) rotate(${clock.angle}deg) scaleY(${clock.arm2})`;
				if (dialRef.current)
					dialRef.current.style.setProperty("--angle", `${clock.angle}deg`);
				if (circleRef.current)
					circleRef.current.style.transform = `scale(${clock.scale})`;
				if (clockStageRef.current && clock.bg > 0)
					clockStageRef.current.style.backgroundColor = `rgba(0,0,0,${clock.bg})`;
			};

			applyClock();

			// ── single pinned timeline ───────────────────────────────
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top top",
					end: "+=550%",
					pin: true,
					scrub: 1,
					anticipatePin: 1,
					invalidateOnRefresh: true,
				},
				onUpdate: applyClock,
			});

			// phase 1 (0–1): intro exits
			tl.to(introRef.current, { y: -140, opacity: 0, ease: "power2.in", duration: 1 }, 0);

			// phase 2 (0.7–2): col1, col2, sub enter
			tl.to(secondSectionRef.current, { opacity: 1, duration: 0.1 }, 0.65);
			tl.to(col1Ref.current, { y: 0, opacity: 1, ease: "power4.out", duration: 1.2 }, 0.7);
			tl.to(col2Ref.current, { y: 0, opacity: 1, ease: "power4.out", duration: 1.2 }, 0.95);
			tl.to(subRef.current, { y: 0, opacity: 1, ease: "power4.out", duration: 1 }, 1.4);

			// phase 3 (2.5–3): text section fades, clock fades in
			tl.to(secondSectionRef.current, { y: -100, opacity: 0, ease: "power2.in", duration: 0.8 }, 2.5);
			tl.to(clockStageRef.current, { opacity: 1, duration: 0.5 }, 2.8);

			// phase 4: arm grows and sweeps simultaneously
			tl.to(clock, { grow: 1, duration: 1.2, ease: "power2.out" }, 3);
			tl.to(clock, { arm2: 1, duration: 0.25, ease: "power2.out" }, 4.2);
			tl.to(clock, { angle: 360, duration: 4, ease: "none" }, 4.2);
			tl.to(clock, { scale: 5, duration: 3, ease: "power2.in" }, 8.2);
			tl.to(clock, { bg: 1, duration: 1, ease: "none" }, 10.2);

			tl.to(finalSectionRef.current, { opacity: 1, duration: 0.6 });

			tl.to(leftRef.current, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" });
			tl.to(rightRef.current, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "<0.2");

			tl.to(textPageRef.current, { opacity: 0, y: -80, duration: 0.8 });
			tl.to(cardsPageRef.current, { opacity: 1, duration: 0.5 });

			tl.add("cards");
			tl.fromTo(
				cardsRowRef.current,
				{ x: window.innerWidth },
				{
					x: -2200,
					duration: 4,
					ease: "none",
					onUpdate() {
						const progress = tl.progress();
						gsap.utils.toArray<HTMLElement>(".tilt-card").forEach((card, i) => {
							const base = i % 2 === 0 ? 6 : -6;
							gsap.set(card, {
								rotation: base + Math.sin(progress * Math.PI * 8 + i * 0.5) * 2,
							});
						});
					},
				},
				"cards"
			);

			tl.to(cardsPageRef.current, { yPercent: -100, duration: 1.2, ease: "power2.inOut" }, "cards+=3.0");
			tl.to(accordionSectionRef.current, { yPercent: 0, duration: 1.2, ease: "power2.inOut" }, "cards+=3.0");
		},
		{ scope: containerRef }
	);

	return (
		<div ref={containerRef} className="relative w-full">
			<div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#938ACF]">
				{/* ── intro text ── */}
				<div ref={introRef} className="absolute w-full flex flex-col items-center font-anton font-bold gap-5">
					<div>
						<div className="line-1 flex flex-wrap justify-center tracking-lighter text-3xl md:text-display-sm lg:text-display-md xl:text-display-md text-black">
							{LINE_1.split("").map((char, i) => (
								<span key={i} className="letter inline-block" style={{ lineHeight: 1 }}>
									{char === " " ? "\u00A0" : char}
								</span>
							))}
						</div>
						<div className="line-2 flex flex-wrap justify-center tracking-lighter text-3xl md:text-display-sm lg:text-display-md xl:text-display-md text-black">
							{LINE_2.split("").map((char, i) => (
								<span key={i} className="letter inline-block" style={{ lineHeight: 1 }}>
									{char === " " ? "\u00A0" : char}
								</span>
							))}
						</div>
					</div>

					<div ref={bottomTextRef} className="flex flex-col text-center text-black xl:text-heading-lg leading-none">
						<p>The future of nightlife will not be built by bigger events.</p>
						<p>It will be built by better systems</p>
					</div>
				</div>

				{/* ── second text section ── */}
				<div ref={secondSectionRef} className="absolute w-full flex flex-col items-center gap-6 md:gap-5">
					<div className="w-full flex flex-col items-center justify-center text-display-md font-anton text-black">
						<div ref={col1Ref} style={{ lineHeight: 1.05, textAlign: "center" }}>{COL_1}</div>
						<div ref={col2Ref} style={{ lineHeight: 1.05, textAlign: "center" }}>{COL_2}</div>
					</div>
					<div
						ref={subRef}
						className="text-center text-heading-xl font-anton text-white"
						style={{ fontWeight: 500, letterSpacing: "0.05em" }}
					>
						{SUB}
					</div>
				</div>

				{/* ── clock section ── */}
				<div ref={clockStageRef} className="absolute inset-0 flex items-center justify-center">
					<div ref={circleRef} className="relative" style={{ width: "60vmin", height: "60vmin", willChange: "transform" }}>
						<Image src="/vector.png" alt="" fill priority className="rounded-full object-cover" />
						<div
							ref={dialRef}
							className="absolute inset-0 rounded-full"
							style={{
								["--angle" as string]: "0deg",
								background:
									"conic-gradient(from 180deg, #000 0deg, #000 var(--angle), transparent var(--angle), transparent 360deg)",
							}}
						/>
						<div
							ref={arm1Ref}
							className="absolute left-1/2 top-1/2"
							style={{
								width: "2px",
								height: "34vmin",
								background: "black",
								transformOrigin: "50% 0%",
								transform: "translate(-50%, 0) scaleY(0)",
							}}
						/>
						<div
							ref={arm2Ref}
							className="absolute left-1/2 top-1/2"
							style={{
								width: "2px",
								height: "34vmin",
								background: "black",
								transformOrigin: "50% 0%",
								transform: "translate(-50%, 0) rotate(0deg) scaleY(0)",
							}}
						/>
					</div>
				</div>

				<div ref={finalSectionRef} className="absolute inset-0 bg-black text-white flex flex-col">
					<div className="flex h-full flex-col md:gap-10 lg:gap-0 lg:flex-row" ref={textPageRef}>
						<div ref={leftRef} className="w-full h-full flex flex-col leading-none items-start justify-start text-[#938ACF] px-4 pt-22 pb-5 lg:py-20 2xl:py-40 gap-2">
							<p className="text-body-md">LESSONS FROM THE INSIDE</p>
							<div className="text-display-lg font-druk leading-none" style={{ lineHeight: 0.8 }}>
								<div>THE CROWD.</div>
								<div>THE BUSINESS.</div>
								<div>WE&apos;VE LIVED BOTH.</div>
							</div>
						</div>

						<div ref={rightRef} className="w-full h-full flex flex-col justify-end text-[#938ACF] text-2xl md:text-heading-xl gap-2 px-4 pb-50">
							<p className="lg:max-w-[90%] xl:max-w-[80%] leading-none tracking-normal" style={{ lineHeight: 0.9 }}>
								We&apos;ve worked behind booths, behind bars, behind
								campaigns, behind communities, and behind
								businesses. The most enduring destinations are built where
								culture meets systems, creativity meets execution,
								and every experience reinforces long-term value.
								WILDBOYS TRIBE partners with nightlife,
								entertainment, and hospitality businesses to create
								destinations people choose, communities people
								belong to, and businesses built for long-term
								relevance.
							</p>
						</div>
					</div>

					<div ref={cardsPageRef} className="absolute inset-0 flex items-center">
						<div ref={cardsRowRef} className="flex items-center">
							{CARD_IMAGES.map((image, i) => (
								<TiltCard key={image} tilt={i % 2 === 0 ? "6" : "-6"} className="w-[400px] h-[550px] flex-shrink-0">
									<Image src={image} alt={`Card ${i + 1}`} fill className="object-cover" sizes="300px" />
								</TiltCard>
							))}
						</div>
					</div>

					<div ref={accordionSectionRef} className="absolute inset-0 bg-black flex flex-col justify-between px-2 lg:px-10 py-20">
						<div className="flex flex-col text-[#938ACF]">
							<p className="text-body-md">THIS IS WHAT WE&apos;VE LEARNED,</p>
							<div className="font-druk text-display-lg tracking-wide" style={{ lineHeight: 0.85 }}>
								<p>GREAT DESTINATIONS</p>
								<p>AREN&apos;T ACCIDENTS.</p>
							</div>
						</div>

						<Accordion items={accordionItems} />
					</div>
				</div>
			</div>
		</div>
	);
}