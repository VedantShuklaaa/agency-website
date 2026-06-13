import BigRevealCard from "@/components/layout/video/revealVIdeo";
import Marquee from "@/components/marquee/marquee1";
import { Clock, Timer } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";


export default function Page() {
	return (
		<div className="w-full bg-[background] font-twid">
			<div className="h-[60vh] w-full flex flex-col">
				<div className="h-[90%] w-full flex items-center px-4">
					<div className="h-full w-full"></div>
					<div className="w-full text-4xl font-light">
						Our services are built around minimal design, meaningful ideas, and smart digital execution. Whether shaping a brand or building an interface, we focus on creating work that’s modern, functional, and designed to move businesses forward.
					</div>
				</div>
				<div className="h-[10%] w-full px-4 py-2 flex items-center justify-between text-xl text-black dark:text-zinc-400">
					<span>© Studio Capabilities</span>
					<span>(CAD® — 02)</span>
					<span>Digital Execution</span>
				</div>
			</div>

			<div className="h-[300vh] w-full border-t border-black dark:border-zinc-600">
				<Marquee text="services©" />

				<BigRevealCard
					className="mx-auto h-[80vh] w-[70vw] overflow-hidden rounded-[40px] border border-zinc-700"
				>
					<Image
						src="/images/about.jpg"
						alt="About"
						fill
						className="object-cover"
					/>
				</BigRevealCard>


				<div className="mt-40">
					{data.map((items, idx) => (
						<div className="h-[40vh] w-full flex flex-col p-4 font-twid" key={idx}>
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
	icon: ReactNode
}


const data: Data[] = [
	{
		title: "Brand Design",
		timerange: "2 - 3",
		discription_1: "Identity Design",
		discription_2: "Product Design",
		discription_3: "Brand Assets",
		discription_4: "Packaging Design",
		icon: <svg width="150" height="150" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75432 0.819537C7.59742 0.726821 7.4025 0.726821 7.24559 0.819537L1.74559 4.06954C1.59336 4.15949 1.49996 4.32317 1.49996 4.5C1.49996 4.67683 1.59336 4.84051 1.74559 4.93046L7.24559 8.18046C7.4025 8.27318 7.59742 8.27318 7.75432 8.18046L13.2543 4.93046C13.4066 4.84051 13.5 4.67683 13.5 4.5C13.5 4.32317 13.4066 4.15949 13.2543 4.06954L7.75432 0.819537ZM7.49996 7.16923L2.9828 4.5L7.49996 1.83077L12.0171 4.5L7.49996 7.16923ZM1.5695 7.49564C1.70998 7.2579 2.01659 7.17906 2.25432 7.31954L7.49996 10.4192L12.7456 7.31954C12.9833 7.17906 13.2899 7.2579 13.4304 7.49564C13.5709 7.73337 13.4921 8.03998 13.2543 8.18046L7.75432 11.4305C7.59742 11.5232 7.4025 11.5232 7.24559 11.4305L1.74559 8.18046C1.50786 8.03998 1.42901 7.73337 1.5695 7.49564ZM1.56949 10.4956C1.70998 10.2579 2.01658 10.1791 2.25432 10.3195L7.49996 13.4192L12.7456 10.3195C12.9833 10.1791 13.2899 10.2579 13.4304 10.4956C13.5709 10.7334 13.4921 11.04 13.2543 11.1805L7.75432 14.4305C7.59742 14.5232 7.4025 14.5232 7.24559 14.4305L1.74559 11.1805C1.50785 11.04 1.42901 10.7334 1.56949 10.4956Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
	}, {
		title: "Video Ads & Motion Content",
		timerange: "2 - 4",
		discription_1: "AI Video Ads for Performance Marketing",
		discription_2: "Short-Form Video Creation",
		discription_3: "AI UGC-Style Video Ads",
		discription_4: "Product Demo & Explainer Videos",
		icon: <svg width="150" height="150" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75432 0.819537C7.59742 0.726821 7.4025 0.726821 7.24559 0.819537L1.74559 4.06954C1.59336 4.15949 1.49996 4.32317 1.49996 4.5C1.49996 4.67683 1.59336 4.84051 1.74559 4.93046L7.24559 8.18046C7.4025 8.27318 7.59742 8.27318 7.75432 8.18046L13.2543 4.93046C13.4066 4.84051 13.5 4.67683 13.5 4.5C13.5 4.32317 13.4066 4.15949 13.2543 4.06954L7.75432 0.819537ZM7.49996 7.16923L2.9828 4.5L7.49996 1.83077L12.0171 4.5L7.49996 7.16923ZM1.5695 7.49564C1.70998 7.2579 2.01659 7.17906 2.25432 7.31954L7.49996 10.4192L12.7456 7.31954C12.9833 7.17906 13.2899 7.2579 13.4304 7.49564C13.5709 7.73337 13.4921 8.03998 13.2543 8.18046L7.75432 11.4305C7.59742 11.5232 7.4025 11.5232 7.24559 11.4305L1.74559 8.18046C1.50786 8.03998 1.42901 7.73337 1.5695 7.49564ZM1.56949 10.4956C1.70998 10.2579 2.01658 10.1791 2.25432 10.3195L7.49996 13.4192L12.7456 10.3195C12.9833 10.1791 13.2899 10.2579 13.4304 10.4956C13.5709 10.7334 13.4921 11.04 13.2543 11.1805L7.75432 14.4305C7.59742 14.5232 7.4025 14.5232 7.24559 14.4305L1.74559 11.1805C1.50785 11.04 1.42901 10.7334 1.56949 10.4956Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
	}, {
		title: "UI/UX",
		timerange: "3 - 4",
		discription_1: "User Research",
		discription_2: "UI/UX Design",
		discription_3: "Micro Interactions",
		discription_4: "Prototyping",
		icon: <svg width="150" height="150" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75432 0.819537C7.59742 0.726821 7.4025 0.726821 7.24559 0.819537L1.74559 4.06954C1.59336 4.15949 1.49996 4.32317 1.49996 4.5C1.49996 4.67683 1.59336 4.84051 1.74559 4.93046L7.24559 8.18046C7.4025 8.27318 7.59742 8.27318 7.75432 8.18046L13.2543 4.93046C13.4066 4.84051 13.5 4.67683 13.5 4.5C13.5 4.32317 13.4066 4.15949 13.2543 4.06954L7.75432 0.819537ZM7.49996 7.16923L2.9828 4.5L7.49996 1.83077L12.0171 4.5L7.49996 7.16923ZM1.5695 7.49564C1.70998 7.2579 2.01659 7.17906 2.25432 7.31954L7.49996 10.4192L12.7456 7.31954C12.9833 7.17906 13.2899 7.2579 13.4304 7.49564C13.5709 7.73337 13.4921 8.03998 13.2543 8.18046L7.75432 11.4305C7.59742 11.5232 7.4025 11.5232 7.24559 11.4305L1.74559 8.18046C1.50786 8.03998 1.42901 7.73337 1.5695 7.49564ZM1.56949 10.4956C1.70998 10.2579 2.01658 10.1791 2.25432 10.3195L7.49996 13.4192L12.7456 10.3195C12.9833 10.1791 13.2899 10.2579 13.4304 10.4956C13.5709 10.7334 13.4921 11.04 13.2543 11.1805L7.75432 14.4305C7.59742 14.5232 7.4025 14.5232 7.24559 14.4305L1.74559 11.1805C1.50785 11.04 1.42901 10.7334 1.56949 10.4956Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
	}, {
		title: "Web",
		timerange: "4 - 6",
		discription_1: "Website Development",
		discription_2: "App Development",
		discription_3: "Interactive Web Design",
		discription_4: "E-commerce Development",
		icon: < svg width="150" height="150" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M7.75432 0.819537C7.59742 0.726821 7.4025 0.726821 7.24559 0.819537L1.74559 4.06954C1.59336 4.15949 1.49996 4.32317 1.49996 4.5C1.49996 4.67683 1.59336 4.84051 1.74559 4.93046L7.24559 8.18046C7.4025 8.27318 7.59742 8.27318 7.75432 8.18046L13.2543 4.93046C13.4066 4.84051 13.5 4.67683 13.5 4.5C13.5 4.32317 13.4066 4.15949 13.2543 4.06954L7.75432 0.819537ZM7.49996 7.16923L2.9828 4.5L7.49996 1.83077L12.0171 4.5L7.49996 7.16923ZM1.5695 7.49564C1.70998 7.2579 2.01659 7.17906 2.25432 7.31954L7.49996 10.4192L12.7456 7.31954C12.9833 7.17906 13.2899 7.2579 13.4304 7.49564C13.5709 7.73337 13.4921 8.03998 13.2543 8.18046L7.75432 11.4305C7.59742 11.5232 7.4025 11.5232 7.24559 11.4305L1.74559 8.18046C1.50786 8.03998 1.42901 7.73337 1.5695 7.49564ZM1.56949 10.4956C1.70998 10.2579 2.01658 10.1791 2.25432 10.3195L7.49996 13.4192L12.7456 10.3195C12.9833 10.1791 13.2899 10.2579 13.4304 10.4956C13.5709 10.7334 13.4921 11.04 13.2543 11.1805L7.75432 14.4305C7.59742 14.5232 7.4025 14.5232 7.24559 14.4305L1.74559 11.1805C1.50785 11.04 1.42901 10.7334 1.56949 10.4956Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg >
	}
]