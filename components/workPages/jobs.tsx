import { Sparkle } from "lucide-react";
import Link from "next/link";


export default function Jobs() {
	return (
		<div className="h-[50vh] w-full flex flex-col items-center justify-between py-4 border-b border-black dark:border-zinc-600">
			<div className="h-[20%] w-full flex items-center justify-center">
				<h1 className="text-6xl">JOB OPENINGS</h1>
			</div>

			<div className="w-full flex flex-col gap-1 ">
				<div className=" w-full flex justify-center gap-4">
					<Link href="/" className="flex items-center justify-center gap-1"><Sparkle className="h-4 w-4 text-purple-400" /><p>Artist Manager</p></Link>
					<Link href="/" className="flex items-center justify-center gap-1"><Sparkle className="h-4 w-4 text-purple-400" /><p>Programming & Event Manager</p></Link>
					<Link href="/" className="flex items-center justify-center gap-1"><Sparkle className="h-4 w-4 text-purple-400" /><p>Graphics Designer</p></Link>
					<Link href="/" className="flex items-center justify-center gap-1"><Sparkle className="h-4 w-4 text-purple-400" /><p>Marketing & Social Media Manager</p></Link>
				</div>
				<div className="flex flex-col">
					<span className="w-full flex items-center justify-center">
						<p>Mail your CV to <span className="text-purple-400">@gmail.com</span> with subject - <span className="font-[700]">'job application'</span> and mention the role you're applying for.</p>
					</span>
					<span className="w-full flex items-center justify-center">
						<p>Please make sure your application is supported by a professional cover letter</p>
					</span>
				</div>
			</div>

			<div className="w-full flex flex-col items-center justify-between">
				<h1 className="text-7xl">APPLY FOR JOB</h1>
				<div className=" w-full flex items-center justify-center gap-10">
					<span className="flex items-center justify-center p-2 gap-2">
						<div className="h-15 w-15 rounded-full bg-purple-400 flex items-center justify-center text-black text-4xl text-onest font-bold">?</div>
						<div className="flex flex-col">
							<span className="font-bold">General Inquiries</span>
							<span className="text-black dark:text-zinc-400">lmao@gmail.com</span>
						</div>
					</span>
					<span className="flex items-center justify-center p-2 gap-2">
						<div className="h-15 w-15 rounded-full bg-purple-400 flex items-center justify-center text-black text-4xl text-onest font-bold">i</div>
						<div className="flex flex-col">
							<span className="font-bold">Interested in joining us?</span>
							<span className="text-black dark:text-zinc-400">lmao2@gmail.com</span>
						</div>
					</span>
				</div>
			</div>
		</div>
	)
}