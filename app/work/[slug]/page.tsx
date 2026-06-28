import Marquee from "@/components/marquee/marquee1";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/lib/constants";
import TransitionLink from "@/components/layout/pageTransition/transitionLink";
import ProjectSidebarSection from "@/components/workPages/projectSidebar";
import HeroMediaSection from "@/components/workPages/heroMediaSection";

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
		<div className="flex w-full flex-col items-center bg-background">
			<div className="w-full border-b border-zinc-100 dark:border-zinc-900">
				<Marquee text={project.title} />
			</div>

			<HeroMediaSection project={project} />

			<ProjectSidebarSection project={project} />

			<div className="w-full border-b border-zinc-100 dark:border-zinc-900">
				<Marquee text="More Work ©" />
			</div>

			<section className="grid w-full grid-cols-1 font-onest font-light lg:grid-cols-2">
				{relatedProjects.map((item, idx) => (
					<TransitionLink key={item.slug} href={`/work/${item.slug}`} className="group">
						<article
							className={`min-h-[32rem] border-b border-zinc-100 transition-all duration-500 hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-950 ${idx % 2 === 1 ? "lg:border-l lg:border-zinc-100 lg:dark:border-zinc-900" : ""
								}`}
						>
							<div className="mx-auto flex max-w-7xl flex-col justify-center gap-2 px-4 py-6 md:px-6 lg:px-10">
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
					</TransitionLink>
				))}
			</section>
		</div>
	);
}