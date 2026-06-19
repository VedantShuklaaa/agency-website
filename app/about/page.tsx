import Marquee from "@/components/marquee/marquee1";
import Reveal from "@/components/marquee/reveal";
import FloatCard from "@/components/aboutUsPage/floatCard";
import ContactUs from "@/components/contactUsCard/contactUs";
import BottomDesc from "@/components/layout/bottomDesc/bottomDesc";
import { OrbitBackground } from "@/components/orbitBackground/withoutScrollTrigger";


export const metadata = {
	title: "About | Wildboys Tribe",
	description: "India's first nightlife architects and management studio.",
};

export default function Page() {
	return (
		<div className="w-full bg-background overflow-hidden">
			<div className="w-full flex flex-col items-center gap-10 justify-between bg-linear-to-b from-white via-purple-300 to-[#938ACF]">
				<div className="w-full max-w-8xl flex flex-col gap-2 items-center p-4 mt-10 leading-none">
					<span className="text-display-md leading-none text-center">
						<h1 className="leading-none text-black font-druk font-bold">THIS PAGE ISN'T ABOUT US, IT'S ABOUT YOU.</h1>
					</span>

					<span className="max-w-4xl text-center">
						<p className="text-body-sm md:text-body-lg font-druk text-zinc-800">
							We are <span className="italic">not</span> vendors. We're an extension
							of your team across brand and web.
						</p>
					</span>
				</div>


				<div className="h-60 xl:h-110 w-60 xl:w-110 rounded-full border">

				</div>

				<BottomDesc text1="© About Apes" text2="(CAD® — 02)" text3="Behind Us" className="text-black" />
			</div>

			<Reveal>
				<Marquee text="about apes©" />
			</Reveal>
			<FloatCard />

			<div className="py-20 w-full flex flex-col border-b border-zinc-100 dark:border-zinc-900">
				<div className="flex flex-col p-4">
					<span className="leading-none">
						<h1 className="text-display-md font-druk">MEET THE TEAM</h1>
					</span>
					<span></span>
				</div>
				<div className="relative h-full flex items-center justify-center">
					<div className="flex flex-col text-9xl md:text-display-2xl text-center leading-none font-dage text-[#938ACF]">
						<span>WILDBOY</span>
						<span>TRIBES</span>
					</div>
					<OrbitBackground />
				</div>
			</div>

			<Reveal>
				<Marquee text="contact©" />
			</Reveal>
			<ContactUs />
		</div>
	)
}


