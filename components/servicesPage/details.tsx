"use client";
import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BigRevealCard from "../layout/video/revealVIdeo";
import Image from "next/image";
import { Link2Icon, Timer } from "lucide-react";
import { Component1Icon, DashboardIcon, LayersIcon, Share1Icon, SketchLogoIcon } from "@radix-ui/react-icons";

gsap.registerPlugin(ScrollTrigger);
export default function DetailCard() {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const cards = gsap.utils.toArray<HTMLElement>(".service-card");

		cards.forEach((card) => {
			gsap.fromTo(
				card,
				{
					y: 120,
					opacity: 0,
					scale: 0.96,
				},
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 1.2,
					ease: "power4.out",
					scrollTrigger: {
						trigger: card,
						start: "top 85%",
						toggleActions: "play none none reverse",
					},
				}
			);
		});
	}, { scope: containerRef });

	return (
		<div className="mt-20 md:mt-28 lg:mt-20 flex flex-col gap-8 lg:gap-10" ref={containerRef}>
			<BigRevealCard className="mx-auto h-[35vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh] w-[95vw] md:w-[85vw] lg:w-[70vw] overflow-hidden rounded-sm">
				<div className="relative h-full w-full">
					<Image
						src="/AQUA_RUMBLE.png"
						alt="About"
						fill
						priority
						sizes="(max-width: 768px) 95vw, (max-width: 1024px) 85vw, 70vw"
						className="object-cover"
					/>
				</div>
			</BigRevealCard>

			<div className="flex flex-col w-full">
				{data.map((items, idx) => (
					<div
						key={idx}
						className="service-card min-h-[30vh] w-full flex flex-col p-4 font-twid"
					>
						<div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-0">
							<div className="w-10 text-base md:text-lg lg:text-xl">0{idx + 1}</div>
							<div className="flex w-full gap-5">
								<div className="w-fit text-heading-lg md:text-heading-xl flex items-center justify-center">
									{items.title}
								</div>

								<div className="flex-1 flex items-center">
									<div className="h-px w-full bg-black dark:bg-zinc-600" />
								</div>

								<div className="w-fit flex items-center justify-center gap-1 whitespace-nowrap text-body-lg md:text-heading-lg">
									<Timer className="h-3 sm:h-4 w-3 sm:w-4" />
									{items.timerange} weeks
								</div>
							</div>
						</div>
						<div className="w-full py-6 px-0 md:px-4 lg:px-10 flex justify-between gap-8">
							<div className="flex flex-col justify-center md:text-body-lg">
								<span>{items.discription_1}</span>
								<span>{items.discription_2}</span>
								<span>{items.discription_3}</span>
								<span>{items.discription_4}</span>
								{items.discription_5 && (
									<span>{items.discription_5}</span>
								)}
							</div>
							<div className="flex items-center justify-center lg:w-50">
								{items.icon}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

interface Data {
	title: string,
	timerange: string,
	discription_1: string,
	discription_2: string,
	discription_3: string,
	discription_4: string,
	discription_5?: string,
	icon: ReactNode
}


const data: Data[] = [
	{
		title: "Demand Generation",
		timerange: "2 - 3",
		discription_1: "Influencer",
		discription_2: "Guest Lists",
		discription_3: "Communities",
		discription_4: "Networks",
		discription_5: "Distribution",
		icon: <LayersIcon className="h-20 w-20 md:h-28 md:w-28 lg:h-40 lg:w-40" />
	}, {
		title: "Positioning & Brand Systems",
		timerange: "2 - 4",
		discription_1: "Brand Identity",
		discription_2: "Storytelling",
		discription_3: "Strategy",
		discription_4: "Content",
		discription_5: "Creative Direction",
		icon: <SketchLogoIcon className="h-20 w-20 md:h-28 md:w-28 lg:h-40 lg:w-40" />
	}, {
		title: "Programming & Experience Design",
		timerange: "3 - 4",
		discription_1: "Event Design",
		discription_2: "Calendar Planning",
		discription_3: "Production",
		discription_4: "Crowd Psychology",
		discription_5: "Concept Development",
		icon: <Component1Icon className="h-20 w-20 md:h-28 md:w-28 lg:h-40 lg:w-40" />
	}, {
		title: "Talent & Culture",
		timerange: "4 - 6",
		discription_1: "Artist Booking",
		discription_2: "Talent Strategy",
		discription_3: "Performance Curation",
		discription_4: "Cultural Alignment",
		icon: <DashboardIcon className="h-20 w-20 md:h-28 md:w-28 lg:h-40 lg:w-40" />
	}, {
		title: "Partnerships & Growth",
		timerange: "4 - 6",
		discription_1: "Brand Collaborations",
		discription_2: "Strategic Partnerships",
		discription_3: "Sponsorships",
		discription_4: "Community Building",
		discription_5: " Client Relations",
		icon: <Share1Icon className="h-20 w-20 md:h-28 md:w-28 lg:h-40 lg:w-40" />
	}, {
		title: "Execution & Revenue Systems",
		timerange: "4 - 6",
		discription_1: "Operations",
		discription_2: "Promotions",
		discription_3: "On-Ground Execution",
		discription_4: "Coordination",
		discription_5: "Revenue Optimization",
		icon: <Link2Icon className="h-20 w-20 md:h-28 md:w-28 lg:h-40 lg:w-40" />
	}
]