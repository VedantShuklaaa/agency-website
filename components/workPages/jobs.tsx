import { Sparkle } from "lucide-react";
import Link from "next/link";

const jobs = [
	"Artist Manager",
	"Programming & Event Manager",
	"Graphics Designer",
	"Marketing & Social Media Manager",
];

export default function Jobs() {
	return (
		<div className="w-full flex flex-col items-center justify-between gap-8 border-b border-zinc-100 dark:border-zinc-900 bg-background px-4 py-8 md:px-6 md:py-10">
			<div className="w-full flex items-center justify-center">
				<h1 className="text-display-sm">JOB OPENINGS</h1>
			</div>

			<div className="w-full flex flex-col md:items-center md:justify-between gap-8 md:gap-6">
				<div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 text-body-sm md:text-body-md leading-none flex-wrap">
					{jobs.map((title) => (
						<Link
							key={title}
							href="/"
							className="flex items-center gap-1 hover:text-purple-300 transition-colors"
						>
							<Sparkle className="h-4 w-4 shrink-0 text-purple-400" />
							<p>{title}</p>
						</Link>
					))}
				</div>

				<div className="flex flex-col gap-2 text-body-sm md:text-body-md md:max-w-4xl items-center">
					<p className="text-center md:text-left">
						Mail your CV to <span className="text-purple-400">@gmail.com</span> with
						subject - <span className="font-bold">&rsquo;job application&rsquo;</span> and
						mention the role you&rsquo;re applying for.
					</p>
					<p className="text-center text-zinc-600 md:text-left">
						Please make sure your application is supported by a professional cover letter
					</p>
				</div>
			</div>

			<div className="w-full flex flex-col items-center gap-6">
				<h1 className="text-display-sm">APPLY FOR JOB</h1>

				<div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
					<div className="flex items-center gap-2 p-2">
						<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-400 text-base font-bold text-black md:h-10 md:w-10 md:text-lg lg:h-11 lg:w-11 lg:text-xl">
							?
						</div>
						<div className="flex flex-col">
							<span className="font-bold text-body-sm md:text-body-md">General Inquiries</span>
							<span className="text-zinc-400 text-body-sm md:text-body-md">lmao@gmail.com</span>
						</div>
					</div>

					<div className="flex items-center gap-2 p-2">
						<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-400 text-base font-bold text-black md:h-10 md:w-10 md:text-lg lg:h-11 lg:w-11 lg:text-xl">
							i
						</div>
						<div className="flex flex-col">
							<span className="font-bold text-body-sm md:text-body-md">Interested in joining us?</span>
							<span className="text-zinc-400 text-body-sm md:text-body-md">lmao2@gmail.com</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}