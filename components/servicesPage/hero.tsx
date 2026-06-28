import BottomDesc from "../layout/bottomDesc/bottomDesc";

export default function Hero() {
	return (
		<div className="min-h-[40vh] lg:h-[60vh] w-full flex flex-col border-b border-zinc-100 dark:border-zinc-900">
			<div className="flex-1 w-full flex flex-col lg:flex-row items-center px-4 lg:px-6 py-6 lg:py-0 gap-6 lg:gap-0">
				<div className="hidden lg:block h-full w-full" />

				<div className="w-full lg:w-[80vw] text-heading-lg md:text-heading-xl font-light leading-tight flex flex-col gap-2">
					<span>Great destinations aren&apos;t built by doing more. They&apos;re built by making every part of the business work together.</span>
					<span>The WILDBOYS Operating System brings strategy, brand, experiences, talent, community, and operations into one connected framework—aligning every part of the business to create stronger destinations and measurable business performance.</span>
				</div>
			</div>

			<BottomDesc text1="© Studio Capabilities" text2="(CAD® — 02)" text3="Digital Execution" className="text-black dark:text-zinc-600" />
		</div>
	);
}