import BottomDesc from "../layout/bottomDesc/bottomDesc";

export default function Hero() {
	return (
		<div className="min-h-[40vh] lg:h-[60vh] w-full flex flex-col border-b border-zinc-100 dark:border-zinc-900 bg-linear-to-b from-white via-green-400 to-emerald-600">
			<div className="flex-1 w-full flex flex-col lg:flex-row items-center px-4 lg:px-6 py-6 lg:py-0 gap-6 lg:gap-0">
				<div className="hidden lg:block h-full w-full" />

				<div className="w-full lg:w-[80vw] text-heading-lg md:text-heading-xl font-light leading-tight text-black">
					Our services cover the full spectrum of venue business development —
					from strategy and audience growth to event design, talent
					programming, and on-ground execution — all designed to move your
					business forward.
				</div>
			</div>

			<BottomDesc text1="© Studio Capabilities" text2="(CAD® — 02)" text3="Digital Execution" className="text-black dark:text-zinc-600"/>
		</div>
	);
}