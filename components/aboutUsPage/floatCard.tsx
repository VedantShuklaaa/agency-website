import Image from "next/image";
import FloatingCard from "../layout/floatingCard/floatingCard";
import ScrollRevealText from "../scrolltriger/fillColor";


const text = "We’re India’s first nightlife architects and management studio. We design operating systems that make venues culturally relevant, community - led, and consistently engaging.";

export default function FloatCard() {
	return (
		<div className="relative h-screen w-full font-twid flex flex-col lg:flex-row items-center justify-center">

			<div className="z-100 h-full w-full flex items-center justify-center p-4">
				<ScrollRevealText text={text} className="text-heading-xl font-druk leading-none text-transparent bg-clip-text" />
			</div>

			<div className="h-full w-full relative">
				<FloatingCard
					y={100}
					className="absolute top-0 right-4"
				>
					<div className="relative h-60 w-40 md:h-80 md:w-80 lg:h-90 xl:h-120 xl:w-80 2xl:w-[23vw] overflow-hidden rounded-[10px] border border-black dark:border-zinc-600">
						<Image
							src="/1.png"
							alt="Nightlife venue"
							fill
							className="object-cover"
							sizes="320px"
						/>
					</div>
				</FloatingCard>

				<FloatingCard
					y={100}
					className="absolute bottom-0 left-4"
				>
					<div className="relative h-60 w-40 md:h-80 md:w-80 lg:h-90 xl:h-120 xl:w-80 2xl:w-[23vw] overflow-hidden rounded-[10px] border border-black dark:border-zinc-600">
						<Image
							src="/2.png"
							alt="Nightlife crowd"
							fill
							className="object-cover"
							sizes="400px"
						/>
					</div>
				</FloatingCard>
			</div>
		</div>
	)
}