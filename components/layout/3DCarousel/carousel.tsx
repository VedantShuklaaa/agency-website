import ScrollRevealText from "@/components/scrolltriger/fillColor";
import Marquee from "@/components/marquee/marquee1";
import CardStack from "../cardStack/cardStack";
import BottomDesc from "../bottomDesc/bottomDesc";
import Reveal from "@/components/marquee/reveal";
import { OrbitBackground } from "@/components/orbitBackground/withScrollTrigger";





const text = "This is where we deploy our systems. Each space becomes a live environment where we test potential, apply operational expertise, and refine performance in real time. From unlocking venue potential to experimenting with new models, business architecture, and growth strategies, everything is built to drive relevance, consistency, and demand. If it doesn’t perform, it doesn’t stay.";

export default function carouselPage() {
	return (
		<div className="relative w-full font-twid border border-zinc-100 dark:border-zinc-900" >
			<section className="relative min-h-[80vh] lg:min-h-screen flex flex-col items-center justify-center gap-6 lg:gap-8 border-b border-zinc-100 dark:border-zinc-900">
				<div className="absolute inset-0 pointer-events-none">
					<OrbitBackground pivotY="30%" />
				</div>

				<div className="relative z-10 w-[90vw] md:w-[70vw] lg:w-[45vw] text-center mt-70 md:mt-55 lg:mt-100">
					<ScrollRevealText
						text={text}
						className="text-heading-lg"
					/>
				</div>
			</section>

			<Reveal>
				<Marquee text="@Intellectual Property" />
			</Reveal>

			<CardStack />

			<BottomDesc text1="© Clients" text2="(CAD® — 06)" text3="Brand Partners" className="text-black dark:text-zinc-400" />
		</div>

	)
}