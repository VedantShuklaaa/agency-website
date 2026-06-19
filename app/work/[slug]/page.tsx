import Marquee from "@/components/marquee/marquee1";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/constants";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	return projects.map((project) => ({
		slug: project.slug,
	}));
}

export const dynamicParams = false;

export default async function WorkPage({ params }: Props) {
	const { slug } = await params;

	const project = projects.find((item) => item.slug === slug);

	if (!project) {
		notFound();
	}

	const relatedProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 4);

	return (
		<div className="flex w-full flex-col items-center overflow-hidden bg-background">
			<div className="w-full border-b border-zinc-100 dark:border-zinc-900">
				<Marquee text={project.title} />
			</div>

			{/* Hero */}
			<section className="w-full border-b border-zinc-100 dark:border-zinc-900">
				<div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-0 lg:grid-cols-12">
					<div className="flex flex-col justify-between px-4 py-8 md:px-6 lg:col-span-4 lg:px-8 lg:py-10">
						<div className="flex flex-col gap-6">
							<span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
								Selected Work
							</span>

							<div className="flex flex-col gap-3">
								<h1 className="text-4xl leading-none sm:text-5xl md:text-6xl xl:text-7xl">
									{project.title}
								</h1>

								<p className="text-lg  text-zinc-700 dark:text-zinc-300">
									{project.description}
								</p>

								{"smallDescription" in project && project.smallDescription && (
									<p className="max-w-4xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
										{project.smallDescription}
									</p>
								)}
							</div>
						</div>

						<div className="mt-10 grid grid-cols-2 gap-6 border-t border-zinc-100 pt-6 dark:border-zinc-900">
							<div className="flex flex-col gap-1">
								<span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
									Client
								</span>
								<span className="text-base md:text-lg">{project.title}</span>
							</div>

							<div className="flex flex-col gap-1">
								<span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
									Location
								</span>
								<span className="text-base md:text-lg">
									{"location" in project && project.location ? project.location : "Bengaluru, India"}
								</span>
							</div>

							<div className="flex flex-col gap-1">
								<span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
									Scope
								</span>
								<span className="text-base md:text-lg">{project.description}</span>
							</div>

							<div className="flex flex-col gap-1">
								<span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
									Year
								</span>
								<span className="text-base md:text-lg">
									{project.year ?? "2026"}
								</span>
							</div>
						</div>
					</div>

					<div className="relative min-h-[50vh] w-full lg:col-span-8 lg:min-h-[85vh] rounded-[10px]">
						<Image
							src={project.src}
							alt={project.title}
							fill
							priority
							className="object-cover rounded-[10px]"
							sizes="(max-width: 1024px) 100vw, 70vw"
						/>
					</div>
				</div>
			</section>

			{/* Overview */}
			<section className="w-full border-b border-zinc-100 dark:border-zinc-900">
				<div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-10 px-4 py-10 md:px-6 lg:grid-cols-12 lg:px-8 lg:py-14">
					<div className="lg:col-span-4">
						<h2 className="text-2xl md:text-3xl">Overview</h2>
					</div>

					<div className="lg:col-span-8">
						<p className="max-w-4xl text-base leading-8 text-zinc-700 dark:text-zinc-300 md:text-lg">
							Groww asked us to work on video editing and post-production for their pre-IPO
							launch, supporting a critical phase in the brand&apos;s growth journey. The focus
							was on creating sharp, high-quality video content that aligned with Groww&apos;s
							clean, trustworthy brand presence.
						</p>
					</div>
				</div>
			</section>

			{/* Showcase */}
			<section className="w-full border-b border-zinc-100 dark:border-zinc-900">
				<div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-8 md:px-6 lg:px-8 lg:py-10">
					<div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100">
						<Image
							src={project.src}
							alt={project.title}
							fill
							className="object-cover"
							sizes="100vw"
						/>
					</div>

					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
							<Image
								src={project.src}
								alt={`${project.title} still 1`}
								fill
								className="object-cover"
								sizes="50vw"
							/>
						</div>

						<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
							<Image
								src={project.src}
								alt={`${project.title} still 2`}
								fill
								className="object-cover"
								sizes="50vw"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* More Work */}
			<div className="w-full border-b border-zinc-100 dark:border-zinc-900">
				<Marquee text="More Work ©" />
			</div>

			<section className="grid w-full grid-cols-1 font-onest font-light lg:grid-cols-2">
				{relatedProjects.map((item, idx) => (
					<Link key={item.slug} href={`/work/${item.slug}`} className="group">
						<article
							className={`min-h-[70vh] border-b border-zinc-100 transition-all duration-500 hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-950 ${idx % 2 === 1 ? "lg:border-l lg:border-zinc-100 lg:dark:border-zinc-900" : ""
								}`}
						>
							<div className="flex flex-col justify-center gap-2 px-4 py-6 md:px-6 lg:px-10">
								<span className="text-display-sm">{item.title}</span>
								<span className="text-heading-lg">{item.description}</span>

								{"smallDescription" in item && item.smallDescription && (
									<p className="max-w-4xl pt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
										{item.smallDescription}
									</p>
								)}
							</div>

							<div className="flex items-center justify-center px-4 pb-6 md:px-6">
								<div className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px]">
									<Image
										src={item.src}
										alt={item.title}
										fill
										className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
										sizes="(max-width: 768px) 100vw, 50vw"
									/>
								</div>
							</div>
						</article>
					</Link>
				))}
			</section>
		</div>
	);
}