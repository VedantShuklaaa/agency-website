export default function BlogPostLoading() {
	return (
		<section className="w-full px-4 py-12">
			<div className="mx-auto max-w-4xl animate-pulse">
				<div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />

				<div className="mt-3 h-10 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
				<div className="mt-2 h-10 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />

				<div className="mt-6 aspect-[16/9] w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800" />

				<div className="mt-6 flex flex-wrap gap-2">
					<div className="h-7 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
					<div className="h-7 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
					<div className="h-7 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800" />
				</div>

				<div className="mt-8 space-y-3">
					<div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
					<div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
					<div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
				</div>
			</div>
		</section>
	);
}