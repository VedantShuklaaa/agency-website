import ScrollRevealText from "@/components/scrolltriger/fillColor";
import BottomDesc from "../bottomDesc/bottomDesc";
import { OrbitBackground } from "@/components/orbitBackground/withScrollTrigger";
import TransitionLink from "../pageTransition/transitionLink";
import SlidingText from "../aboutUsButton/aboutUsButton";


const text1 = "This is where our systems come to life. Every venue holds untapped potential. Our role is to transform that potential into destinations people return to, communities people belong to, and businesses that perform. Whether you're creating something new or transforming what already exists, we architect the operating system that brings your vision to life. If it doesn't perform, it doesn't stay.";

export default function CarouselPage() {
	return (
		<div className="relative w-full font-twid border border-zinc-100 dark:border-zinc-900" >
			<section className="relative min-h-[80vh] lg:min-h-[75vh] flex flex-col items-center justify-center gap-6 lg:gap-8 border-b border-zinc-100 dark:border-zinc-900">
				<div className="absolute inset-0 pointer-events-none">
					<OrbitBackground pivotY="35%" />
				</div>

				<div className="relative z-10 w-[90vw] md:w-[70vw] lg:w-[45vw] text-center mt-70 md:mt-55 lg:mt-100">
					<ScrollRevealText
						text={text1}
						className="text-heading-lg"
					/>
				</div>

				<TransitionLink className="group relative w-fit h-10 px-5 border-2 rounded-xl border-zinc-100 dark:border-white flex items-center justify-center overflow-hidden" href="/services">
					<div className="absolute inset-0 bg-[#FF0000] origin-bottom scale-y-0 transition-transform duration-500 ease-in-out group-hover:scale-y-100 rounded-xl" />
					<span className="relative z-10">
						<SlidingText text="EXPLORE SERVICES" />
					</span>
				</TransitionLink>
			</section>

			<BottomDesc text1="Our Capabilities" text3="The Operating System" className="text-black dark:text-zinc-400" />
		</div>

	)
}