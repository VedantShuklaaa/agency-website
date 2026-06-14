"use client";
import { useRef } from "react";
import BigRevealCard from "@/components/layout/video/revealVIdeo";
import Marquee from "@/components/marquee/marquee1";
import { Timer } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import { SketchLogoIcon, LayersIcon, Component1Icon, DashboardIcon, Share1Icon, Link2Icon } from "@radix-ui/react-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HoverExpand from "@/components/layout/hoverCard/hoverCardDisplay";
import ProcessCardLeft, { ProcessCardRight } from "@/components/layout/verticalCarousel/verticalCarousel";
import FAQAccordion from "@/components/layout/FAQAccordian/FAQAccordian";
import ContactUs from "@/components/contactUsCard/contactUs";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {


	return (
		<div className="w-full bg-[background] font-twid">
			<div className="h-[60vh] w-full flex flex-col">
				<div className="h-[90%] w-full flex items-center px-4">
					<div className="h-full w-full"></div>
					<div className="w-[80vw] text-4xl font-light">
						Our services cover the full spectrum of venue business development — from strategy and audience growth to event design, talent programming, and on-ground execution — all designed to move your business forward.
					</div>
				</div>
				<div className="h-[10%] w-full px-4 py-2 flex items-center justify-between text-xl text-black dark:text-zinc-400">
					<span>© Studio Capabilities</span>
					<span>(CAD® — 02)</span>
					<span>Digital Execution</span>
				</div>
			</div>

			<div className="h-[370vh] w-full border-t border-black dark:border-zinc-600">
				<Marquee text="services©" />

				<BigRevealCard className="mx-auto h-[80vh] w-[70vw] overflow-hidden rounded-[40px] border border-zinc-700">
					<Image
						src="/images/about.jpg"
						alt="About"
						fill
						className="object-cover"
					/>
				</BigRevealCard>

				<DetailCard />
			</div>



			<div className="h-screen w-full flex flex-col items-center justify-center border-b border-black dark:border-zinc-600">
				<div className="h-[95%] w-full flex items-center justify-center">
					<HoverExpand />
				</div>

				<div className="h-[5%] w-full px-4 flex items-center justify-between text-xl text-black dark:text-zinc-400">
					<span>© Featured Projects</span>
					<span>(CAD® — 04)</span>
					<span>Digital Showcase</span>
				</div>
			</div>

			<div className="h-[120vh] w-full flex flex-col justify-between border-b border-black dark:border-zinc-600">
				<div className="flex flex-col">
					<Marquee text="featured works©" />

					<div className="grid grid-cols-[2fr_2fr_1fr] h-[70vh] w-full font-onest border-b border-black dark:border-zinc-600">
						<div className="border-r border-black dark:border-zinc-600">
							<div className="h-[25%] w-full flex flex-col justify-center gap-2 px-10">
								<span className="text-5xl">Bloc</span>
								<span className="text-xl">Brand Identity, Product Design</span>
							</div>

							<div className="h-[75%] w-full flex items-center justify-center py-4 px-6">
								<div className="project-card h-full w-full bg-black dark:bg-white rounded-xl" />
							</div>
						</div>

						<div className="border-r border-black dark:border-zinc-600">
							<div className="h-[25%] w-full flex flex-col justify-center gap-2 px-10">
								<span className="text-5xl">Redmi 11S</span>
								<span className="text-xl">Product Launch Video</span>
							</div>

							<div className="h-[75%] w-full flex items-center justify-center py-4 px-6">
								<div className="project-card h-full w-full bg-black dark:bg-white rounded-xl" />
							</div>
						</div>

						<div className="p-4 group overflow-hidden">
							<div className=" h-full w-full bg-[#ff2d55] rounded-xl transition-all cursor-pointer duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.1] group-hover:rounded-none flex items-center justify-center">
								<span className="text-black text-3xl">View All Projects</span>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full h-[5%] flex items-center justify-between px-4 text-black dark:text-zinc-400 text-xl">
					<span>© Process</span>
					<span>(CAD® — 04)</span>
					<span>Design Method
					</span>
				</div>
			</div>

			<div className="w-full flex flex-col">
				<Marquee text="process©" />
			</div>

			<div className="w-full flex flex-col justify-between border-b border-black dark:border-zinc-600">
				<section className="relative w-full">
					<div className="flex justify-between px-6 py-24">

						<div className="w-[30vw] sticky top-24 h-fit">
							<ProcessCardLeft />
						</div>

						<div className="w-[50vw]">
							<ProcessCardRight />
						</div>

					</div>
				</section>

				<div className="w-full h-[5vh] flex items-center justify-between px-4 text-black dark:text-zinc-400 text-xl">
					<span>© Everything You Want to Know</span>
					<span>(CAD® — 08)</span>
					<span>Clarifications</span>
				</div>
			</div>

			<Lmao />


			<ContactUs />
		</div>
	)
}

export function Lmao() {
	return (
		<div className="min-h-screen w-full flex font-twid">
			<div className="w-full flex items-center  p-4 text-9xl" >
				FAQ
			</div>

			<div className="w-full relative z-50 px-4 flex items-center justify-center">
				<FAQAccordion />
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
		icon: <LayersIcon className="h-40 w-40" />
	}, {
		title: "Positioning & Brand Systems",
		timerange: "2 - 4",
		discription_1: "Brand Identity",
		discription_2: "Storytelling",
		discription_3: "Strategy",
		discription_4: "Content",
		discription_5: "Creative Direction",
		icon: <SketchLogoIcon className="h-40 w-40" />
	}, {
		title: "Programming & Experience Design",
		timerange: "3 - 4",
		discription_1: "Event Design",
		discription_2: "Calendar Planning",
		discription_3: "Production",
		discription_4: "Crowd Psychology",
		discription_5: "Concept Development",
		icon: <Component1Icon className="h-40 w-40" />
	}, {
		title: "Talent & Culture",
		timerange: "4 - 6",
		discription_1: "Artist Booking",
		discription_2: "Talent Strategy",
		discription_3: "Performance Curation",
		discription_4: "Cultural Alignment",
		icon: <DashboardIcon className="h-40 w-40" />
	}, {
		title: "Partnerships & Growth",
		timerange: "4 - 6",
		discription_1: "Brand Collaborations",
		discription_2: "Strategic Partnerships",
		discription_3: "Sponsorships",
		discription_4: "Community Building",
		discription_5: " Client Relations",
		icon: <Share1Icon className="h-40 w-40" />
	}, {
		title: "Execution & Revenue Systems",
		timerange: "4 - 6",
		discription_1: "Operations",
		discription_2: "Promotions",
		discription_3: "On-Ground Execution",
		discription_4: "Coordination",
		discription_5: "Revenue Optimization",
		icon: <Link2Icon className="h-40 w-40" />
	}
]

export function DetailCard() {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const cards = gsap.utils.toArray<HTMLElement>(".service-card");

		cards.forEach((card, index) => {
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
		<div className="mt-40" ref={containerRef}>
			{data.map((items, idx) => (
				<div
					key={idx}
					className="service-card h-[40vh] w-full flex flex-col p-4 font-twid"
				>
					<div className="h-[20%] w-full flex">
						<div className="w-10 text-xl">0{idx + 1}</div>
						<div className="flex w-full gap-5">
							<div className="w-fit text-4xl flex items-center justify-center">
								{items.title}
							</div>

							<div className="flex-1 flex items-center">
								<div className="h-px w-full bg-black dark:bg-zinc-600" />
							</div>

							<div className="w-fit flex items-center justify-center gap-1 whitespace-nowrap">
								<Timer className="h-4 w-4" />
								{items.timerange} weeks
							</div>
						</div>
					</div>
					<div className="h-[80%] w-full py-6 px-10 flex justify-between">
						<div className="h-full w-100 flex flex-col justify-center text-2xl">
							<span>{items.discription_1}</span>
							<span>{items.discription_2}</span>
							<span>{items.discription_3}</span>
							<span>{items.discription_4}</span>
						</div>
						<div className="h-full w-50 flex items-center justify-center">
							{items.icon}
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

