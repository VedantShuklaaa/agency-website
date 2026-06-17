import Image from "next/image";
import BottomDesc from "../layout/bottomDesc/bottomDesc";

export default function Feature() {
	return (
		<div className="min-h-screen lg:h-[90vh] w-full flex flex-col justify-between border-b border-black dark:border-zinc-600">

			<div className="flex-1">
				<div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr] w-full font-onest border-b border-black dark:border-zinc-600">

					{/* Card 1 */}
					<div className="lg:border-r border-black dark:border-zinc-600">
						<div className="flex flex-col justify-center gap-2 px-4 md:px-6 lg:px-10 py-6">
							<span className="text-heading-xl">
								Bloc
							</span>

							<span className="text-heading-lg">
								Brand Identity, Product Design
							</span>
						</div>

						<div className="flex items-center justify-center px-4 md:px-6 pb-6 group">
							<div className="project-card relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full overflow-hidden rounded-xl">
								<Image
									src="/1.png"
									alt="Project Preview"
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-105"
								/>
							</div>
						</div>
					</div>

					{/* Card 2 */}
					<div className="lg:border-r border-black dark:border-zinc-600">
						<div className="flex flex-col justify-center gap-2 px-4 md:px-6 lg:px-10 py-6">
							<span className="text-heading-xl">
								Redmi 11S
							</span>

							<span className="text-heading-lg">
								Product Launch Video
							</span>
						</div>

						<div className="flex items-center justify-center px-4 md:px-6 pb-6 group">
							<div className="project-card relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full overflow-hidden rounded-xl">
								<Image
									src="/2.png"
									alt="Project Preview"
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-105"
								/>
							</div>
						</div>
					</div>

					{/* CTA */}
					<div className="p-4 group overflow-hidden min-h-[220px] lg:min-h-0">
						<div className="h-full min-h-[220px] w-full bg-[#ff2d55] rounded-xl transition-all cursor-pointer duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] lg:group-hover:scale-[1.08] lg:group-hover:rounded-none flex items-center justify-center">
							<span className="text-heading-xl text-black text-center px-4">
								View All Projects
							</span>
						</div>
					</div>

				</div>
			</div>

			<BottomDesc text1="© Process" text2="(CAD® — 04)" text3="Design Method" />
		</div>
	);
}