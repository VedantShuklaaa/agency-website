import Marquee from "@/components/marquee/marquee1";
import FloatingCard from "@/components/layout/floatingCard/floatingCard";
import ScrollRevealText from "@/components/scrolltriger/fillColor";


const text = "We’re an India-based creative design and development studio working with startups, scale-ups, and global brands. Our work spans branding, UI/UX, motion, and interactive web design across multiple industries.";

export default function Page() {
	return (
		<div className="w-full bg-[background]">
			<div className="h-[70vh] w-full font-twid flex flex-col justify-between items-end">
				<div />

				<div className="w-[50vw] flex p-4">
					<span className="text-5xl">Creative Apes is a digital studio helping brands look sharp, feel modern, and stand out. We create identities, interactions, and visual systems built for impact.</span>
				</div>

				<div className="p-4 w-full flex item-center justify-between border-b border-black dark:border-zinc-600">
					<span>© About Apes</span>
					<span>(CAD® — 02)</span>
					<span>Behind Us</span>
				</div>
			</div>

			<Marquee text="about apes©" />

			<div className="relative h-[120vh] w-full font-twid">
				<FloatingCard
					y={100}
					className="absolute top-50 left-40"
				>
					<div className="h-160 w-80 rounded-3xl border border-black dark:border-zinc-600" />
				</FloatingCard>

				<div className="absolute left-1/2 -translate-x-1/2 top-20">
					<ScrollRevealText text={text} className="text-6xl w-240"/>
				</div>

				<FloatingCard
					y={100}
					className="absolute top-20 right-30"
				>
					<div className="h-150 w-100 rounded-3xl border border-black dark:border-zinc-600" />
				</FloatingCard>
			</div>
		</div>
	)
}
