import Image from "next/image";
import FloatingCard from "../layout/floatingCard/floatingCard";
import ScrollRevealText from "../scrolltriger/fillColor";


const text = "We’re India’s first nightlife architects and management studio. We design operating systems that make venues culturally relevant, community - led, and consistently engaging.";

export default function FloatCard() {
	return (
		<div className="relative h-screen w-full font-twid">
			<FloatingCard
				y={100}
				className="absolute top-10 lg:top-50 lg:left-40 hidden lg:flex"
			>
				<div className="relative h-160 w-80 overflow-hidden rounded-[10px] border border-black dark:border-zinc-600">
					<Image
						src="/1.png"
						alt="Nightlife venue"
						fill
						className="object-cover"
						sizes="320px"
					/>
				</div>
			</FloatingCard>

			<div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-100">
				<ScrollRevealText text={text} className="text-display-sm w-[80vw] 2xl:w-240 leading-none text-transparent bg-clip-text" />
			</div>

			<FloatingCard
				y={100}
				className="absolute top-20 right-30 hidden lg:flex"
			>
				<div className="relative h-150 w-100 overflow-hidden rounded-[10px] border border-black dark:border-zinc-600">
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
	)
}