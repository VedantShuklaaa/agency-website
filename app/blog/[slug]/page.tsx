// app/blog/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogs } from "@/lib/constants";

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params;

	const post = blogs.find((item) => item.slug === slug);

	if (!post) {
		notFound();
	}

	return (
		<section className="w-full px-4 py-12">
			<div className="mx-auto max-w-4xl">
				<p className="text-sm text-zinc-500">{post.date}</p>

				<h1 className="mt-3 text-4xl font-semibold leading-tight">
					{post.title}
				</h1>

				<div className="mt-6 relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100">
					<Image
						src={post.src}
						alt={post.title}
						fill
						className="object-cover"
						sizes="100vw"
					/>
				</div>

				<div className="mt-6 flex flex-wrap gap-2">
					{post.tags.map((tag) => (
						<span
							key={tag}
							className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600"
						>
							{tag}
						</span>
					))}
				</div>

				<p className="mt-8 text-lg leading-8 text-zinc-700">
					{post.description}
				</p>
			</div>
		</section>
	);
}