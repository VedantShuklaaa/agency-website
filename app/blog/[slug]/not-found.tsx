import Link from "next/link";

export default function BlogPostNotFound() {
	return (
		<main className="flex min-h-[70vh] items-center justify-center px-4 border-b border-zinc-100 dark:border-zinc-900">
			<div className="mx-auto max-w-5xl text-center">
				<p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
					Blog 404
				</p>

				<h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
					This post does not exist
				</h1>

				<p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
					The article you are looking for was not found. It may have been removed,
					renamed, or the slug may be incorrect.
				</p>

				<div className="mt-8 flex items-center justify-center gap-3">
					<Link
						href="/blog"
						className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm text-white transition hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
					>
						Back to blog
					</Link>

					<Link
						href="/"
						className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
					>
						Go home
					</Link>
				</div>
			</div>
		</main>
	);
}