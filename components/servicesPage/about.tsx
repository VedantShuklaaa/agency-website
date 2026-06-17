import BottomDesc from "../layout/bottomDesc/bottomDesc";
import ProcessCardLeft, { ProcessCardRight } from "../layout/verticalCarousel/verticalCarousel";

export default function AboutUs() {
	return (
		<div className="w-full flex flex-col justify-between border-b border-black dark:border-zinc-600">
			<section className="relative w-full">
				<div className="flex flex-col md:flex-row justify-between px-4 md:px-6 py-12 lg:py-24 gap-10 lg:gap-0">

					<div className="w-full md:sticky lg:top-24 h-fit">
						<ProcessCardLeft />
					</div>

					<div className="w-full">
						<ProcessCardRight />
					</div>

				</div>
			</section>

			<BottomDesc text1="© Everything You Want to Know" text2="(CAD® — 08)" text3="Clarifications" className="text-black dark:text-zinc-400"/>
		</div>
	)
}