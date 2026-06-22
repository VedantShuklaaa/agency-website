export default function AdminLoading() {
	return (
		<div className="min-h-screen bg-[#0a0a0a] px-4 py-6 text-white sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl animate-pulse">

				{/* Header */}
				<div className="mb-8 flex flex-col gap-3 border-b border-white/8 pb-6 lg:flex-row lg:items-end lg:justify-between">
					<div className="space-y-2">
						<div className="h-3 w-32 rounded bg-white/10" />
						<div className="h-9 w-64 rounded bg-white/10" />
					</div>
					<div className="flex items-center gap-2">
						<div className="h-7 w-20 rounded-full bg-white/10" />
						<div className="h-7 w-28 rounded-full bg-white/10" />
						<div className="h-7 w-24 rounded-full bg-white/10" />
					</div>
				</div>

				<div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)]">
					<div className="space-y-6">
						{/* Editor card skeleton */}
						<div className="rounded-[10px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
							<div className="mb-6 space-y-2">
								<div className="h-3 w-16 rounded bg-white/10" />
								<div className="h-6 w-40 rounded bg-white/10" />
							</div>
							<div className="grid gap-4 md:grid-cols-2">
								<div className="h-12 rounded-[10px] bg-white/[0.04]" />
								<div className="h-12 rounded-[10px] bg-white/[0.04]" />
								<div className="h-12 rounded-[10px] bg-white/[0.04]" />
								<div className="h-12 rounded-[10px] bg-white/[0.04]" />
							</div>
							<div className="mt-4 h-28 rounded-[10px] bg-white/[0.04]" />
						</div>

						{/* Categories card skeleton */}
						<div className="rounded-[10px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
							<div className="mb-6 space-y-2">
								<div className="h-3 w-16 rounded bg-white/10" />
								<div className="h-6 w-32 rounded bg-white/10" />
							</div>
							<div className="h-12 rounded-[10px] bg-white/[0.04]" />
							<div className="mt-4 flex flex-wrap gap-2.5">
								<div className="h-9 w-24 rounded-full bg-white/[0.04]" />
								<div className="h-9 w-20 rounded-full bg-white/[0.04]" />
								<div className="h-9 w-28 rounded-full bg-white/[0.04]" />
							</div>
						</div>
					</div>

					{/* Blog list skeleton */}
					<aside className="rounded-[10px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
						<div className="mb-6 space-y-2">
							<div className="h-3 w-24 rounded bg-white/10" />
							<div className="h-6 w-28 rounded bg-white/10" />
						</div>
						<div className="space-y-3">
							{Array.from({ length: 4 }).map((_, i) => (
								<div key={i} className="h-24 rounded-[10px] border border-white/8 bg-black/20" />
							))}
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
}