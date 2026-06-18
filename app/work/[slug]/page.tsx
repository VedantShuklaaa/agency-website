import Marquee from "@/components/marquee/marquee1";
import Image from "next/image";
import Link from "next/link";

export default async function WorkPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return (
		<div className="w-full bg-[background] flex flex-col items-center overflow-hidden">
			<div className="w-full border-b border-zinc-100 dark:border-zinc-900">
				<Marquee text={slug} />
			</div>

			<div className="h-[80vh] w-[80vw] bg-pink-200"></div>

			<div className="w-full flex flex-col lg:flex-row border-b border-zinc-100 dark:border-zinc-900">

				{/* Left Side */}
				<div className="w-full lg:w-[30%] flex flex-col p-4 md:p-6 gap-8">

					{/* Overview */}
					<div className="flex flex-col gap-3">
						<h2 className="text-2xl md:text-3xl text-black dark:text-zinc-400">
							Overview
						</h2>

						<p className="text-body-sm leading-relaxed">
							Groww asked us to work on video editing and post-production for
							their pre-IPO launch, supporting a critical phase in the brand's
							growth journey. The focus was on creating sharp, high-quality
							video content that aligned with Groww's clean, trustworthy brand
							presence.
						</p>
					</div>

					{/* Details */}
					<div className="grid grid-cols-2 gap-6">

						<div className="flex flex-col gap-4">
							<div>
								<p className="text-sm text-zinc-600 dark:text-zinc-400">
									Client
								</p>

								<p className="text-base md:text-lg">
									{slug}
								</p>
							</div>

							<div>
								<p className="text-sm text-zinc-600 dark:text-zinc-400">
									Duration
								</p>

								<p className="text-base md:text-lg">
									1 Month
								</p>
							</div>
						</div>

						<div className="flex flex-col gap-4">
							<div>
								<p className="text-sm text-zinc-600 dark:text-zinc-400">
									Location
								</p>

								<p className="text-base md:text-lg">
									Bengaluru, India
								</p>
							</div>

							<div>
								<p className="text-sm text-zinc-600 dark:text-zinc-400">
									Stack
								</p>

								<p className="text-base md:text-lg">
									Adobe Premiere Pro,
									<br />
									Adobe After Effects
								</p>
							</div>
						</div>

					</div>

					{/* Services */}
					<div className="flex flex-col gap-3">
						<p className="text-sm text-zinc-600 dark:text-zinc-400">
							Services
						</p>

						<div className="flex flex-col text-base md:text-lg">
							<span>Video Editing</span>
							<span>Composition & Sound</span>
							<span>VFX</span>
							<span>Motion Graphics</span>
						</div>
					</div>

				</div>

				{/* Right Side */}
				<div className="w-full lg:w-[70%] p-4 md:p-6">
					<div className="w-full aspect-video lg:min-h-[80vh] rounded-xl bg-purple-200" />
				</div>

			</div>

			<div className="w-full border-b border-zinc-100 dark:border-zinc-900">
				<Marquee text="More Work©" />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 font-onest font-light w-full">
				{projects.map((project, idx) => (
					<Link
						key={idx}
						href={`/work/${project.slug}`}>
						<div
							key={project.title}
							className={`border-b border-zinc-100 dark:border-zinc-900 lg:min-h-[80vh] ${idx % 2 === 1 ? "lg:border-l lg:border-zinc-100 lg:dark:border-zinc-900" : ""}`}
						>
							<div className="flex flex-col justify-center gap-2 px-4 md:px-6 lg:px-10 py-6">
								<span className="text-display-sm">
									{project.title}
								</span>

								<span className="text-heading-lg">
									{project.description}
								</span>
							</div>

							<div className="flex items-center justify-center px-4 md:px-6 pb-6">
								<div className="project-card relative aspect-[16/10] w-full overflow-hidden rounded-xl group">
									<Image
										src={project.src}
										alt={project.title}
										fill
										priority={idx === 0}
										className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
									/>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

const projects = [
	{
		title: "Groww",
		description: "Launch Video Campaign",
		slug: "Groww",
		src: "/1.png"
	},
	{
		title: "Cult",
		description: "Smartwatch Launch Video",
		slug: "Cult",
		src: "/2.png"
	},
	{
		title: "Arovalis",
		description: "Brand Identity Design",
		slug: "Arovalis",
		src: "/3.png"
	},
	{
		title: "Pure Project",
		description: "Brand Identity & Packaging Design",
		slug: "Pure Project",
		src: "/4.png"
	},
] 