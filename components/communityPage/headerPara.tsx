import { AnimatedLetters } from "../servicesPage/hero";



export default function HeaderPara() {
	return (
		<div className="w-full min-h-[40vh] lg:min-h-[60vh] flex flex-col border-b border-zinc-300 dark:border-zinc-900 p-4 gap-4">
			<div className="h-[70vh] w-full border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-center px-4 lg:px-6">
				<AnimatedLetters
					text="BUILT AROUND PEOPLE, DRIVEN BY IDEAS."
					className="text-display-sm md:text-display-md lg:text-display-lg font-anton text-center justify-center w-[75vw]"
				/>
			</div>

			<div className="flex">
				<div className="h-full lg:w-[40vw] xl:w-[30vw] w-full hidden lg:flex" />
				<div className="h-full w-full flex items-center justify-center ">
					<p className="font-twid text-body-md sm:text-heading-lg md:text-heading-xl">
						Our community brings together creators, artists, and culture-builders
						across music, media, and entertainment — forming an evolving ecosystem
						driven by ideas, collaboration, and impact. We believe in collisions —
						where different styles, disciplines, and perspectives come together to
						create what didn&rsquo;t exist before. From nightlife to digital ecosystems,
						we operate at the intersection of creativity, systems, and culture —
						where ideas don&rsquo;t just exist, they scale.
					</p>
				</div>
			</div>
		</div>
	)
}