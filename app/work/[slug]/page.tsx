import Marquee from "@/components/marquee/marquee1";


export default async function WorkPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return (
		<div className="w-full bg-[background] flex flex-col items-center gap-10">
			<div className="w-full border-b border-black dark:border-zinc-600">
				<Marquee text={slug} />
			</div>

			<div className="h-[80vh] w-[80vw] border-t border-l border-r rounded-t-[15px] bg-pink-200"></div>

			<div className="h-screen w-full flex justify-center border-b border-black dark:border-zinc-600">
				<div className="w-[30%] h-full flex flex-col p-4">
					<div className="h-[30%] w-full flex flex-col justify-center gap-2">
						<span className="text-black dark:text-zinc-400 text-3xl">Overview</span>
						<span>
							<p className="text-xl">Groww asked us to work on video editing and post-production for their pre-IPO launch, supporting a critical phase in the brand’s growth journey. The focus was on creating sharp, high-quality video content that aligned with Groww’s clean, trustworthy brand presence.</p>
						</span>
					</div>

					<div className="h-[50%] w-full flex justify-center gap-2">
						<div className="h-full w-full flex flex-col gap-5 py-10">
							<div className="flex flex-col">
								<span className="text-zinc-600 dark:text-zinc-400 text-sm">Client:</span>
								<span className="text-lg">{slug}</span>
							</div>

							<div className="flex flex-col">
								<span className="text-zinc-600 dark:text-zinc-400 text-sm">Duration</span>
								<span className="text-lg">1 month</span>
							</div>
						</div>
						<div className="h-full w-full flex flex-col gap-5 py-10">
							<div className="flex flex-col">
								<span className="text-zinc-600 dark:text-zinc-400 text-sm">Location:</span>
								<span className="text-lg">Bengaluru, India</span>
							</div>

							<div className="flex flex-col">
								<span className="text-zinc-600 dark:text-zinc-400 text-sm">Stack</span>
								<span className="w-40 text-lg">Adobe Premier Pro, Adobe After Effects</span>
							</div>
						</div>
					</div>

					<div className="h-[20%] w-full flex flex-col justify-center p-4 gap-2">
						<h1 className="text-zinc-600 dark:text-zinc-400 text-sm">Services</h1>
						<div className="flex flex-col text-lg">
							<span>Video editing,</span>
							<span>Composition, Sound,</span>
							<span>VFX, Motion Graphics.</span>
						</div>
					</div>
				</div>

				<div className="h-full w-[70%] p-4">
					<div className="h-full w-full bg-purple-200">

					</div>
				</div>
			</div>

			<div className="w-full border-b border-black dark:border-zinc-600">
				<Marquee text="More Work©" />
			</div>

			<div className="w-full grid grid-cols-2 h-[150vh]">
				{projects.map((project, index) => (
					<div
						key={project.title}
						className={`${index % 2 === 1 ? "border-l" : ""} ${index < projects.length - 2 ? "border-b" : ""}`}
					>
						<div className="h-[75%] w-full flex items-center justify-center py-4 px-20">
							<div className="project-card h-full w-full bg-black dark:bg-white rounded-xl" />
						</div>

						<div className="h-[25%] w-full flex flex-col justify-center gap-2 px-10">
							<span className="text-5xl">{project.title}</span>
							<span className="text-xl">{project.description}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

const projects = [
	{
		title: "Groww",
		description: "Launch Video Campaign",
	},
	{
		title: "Cult",
		description: "Smartwatch Launch Video",
	},
	{
		title: "Arovalis",
		description: "Brand Identity Design",
	},
	{
		title: "Pure Project",
		description: "Brand Identity & Packaging Design",
	},
] 