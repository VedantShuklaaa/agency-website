import BottomDesc from "../layout/bottomDesc/bottomDesc";



export default function Details() {
	return (
		<div className="w-full flex flex-col items-end border-b border-zinc-100 dark:border-zinc-900">
			<div className="py-40 md:w-[50%] flex items-center justify-center p-4">
				<span className="text-heading-xl font-twid leading-none">
					<p>Our work begins where fragmented execution ends. We build and operate venues with a clear sense of ownership and intent, aligning every part of the business into one connected system designed to perform. The result is destinations that remain culturally relevant, commercially resilient, and built to lead their market.</p>
				</span>
			</div>

			<BottomDesc text1="© Featured Projects" text2="(CAD® — 02)" text3="Digital Showcase" className="text-black dark:text-zinc-400" />
		</div>
	)
}