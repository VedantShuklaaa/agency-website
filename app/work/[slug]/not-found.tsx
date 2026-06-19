import Link from "next/link";

export default function WorkNotFound() {
	return (
		<main className="flex min-h-[70vh] items-center justify-center px-4">
			<div className="mx-auto max-w-2xl text-center">
				<p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
					404
				</p>

				<h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
					Project not found
				</h1>

				<p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
					The work page you are trying to open does not exist or the slug is invalid.
				</p>

				<div className="mt-8 flex items-center justify-center gap-3">
					<Link
						href="/work"
						className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm text-white transition hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
					>
						Back to work
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