"use client";
import { useState } from "react";
import { NavLink, SentenceRoll } from "../layout/navAnimation/navAnimation";
import SlidingText from "../layout/aboutUsButton/aboutUsButton";


export default function Links() {
	return (
		<div className="flex flex-col w-full p-4 gap-3 border-b border-black dark:border-zinc-600">
			<UnderlineHover>
				<SentenceRoll className="text-xl font-onest" text="Office: Banglore, Pune. India" />
			</UnderlineHover>
			<UnderlineHover>
				<SentenceRoll className="text-xl font-onest" text="Follow us on instagram" />
			</UnderlineHover>
			<UnderlineHover>
				<SentenceRoll className="text-xl font-onest" text="connect@creativeapes.design" />
			</UnderlineHover>


			<div className="flex flex-col gap-10 w-full">
				<span className="h-[30vh] w-full flex flex-col justify-center px-10 gap-4">
					<p className="text-5xl">We build what doesn’t exist yet. With brands, artists, and institutions, we shape ideas into identities and experiences that move culture forward.</p>
					<p className="text-xl text-zinc-400">For new projects, collaborations, or inquiries, please add your details to the form</p>
				</span>

				<ContactForm />

				<div className="h-[5vh] w-full flex item-center justify-between p-4 text-xl text-black dark:text-zinc-400">
					<span>© Featured Projects</span>
					<span>(CAD® — 02)</span>
					<span>Digital Showcase</span>
				</div>
			</div>
		</div>
	)
}

interface UnderlineHoverProps {
	children: React.ReactNode;
}

export function UnderlineHover({
	children,
}: UnderlineHoverProps) {
	return (
		<div className="group relative w-full pb-2 cursor-pointer">
			{children}

			<div className="absolute bottom-0 left-0 h-px w-full bg-zinc-600" />

			<div className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
		</div>
	);
}

export function ContactForm() {
	const [form, setForm] = useState({
		name: "",
		role: "",
		projectType: "",
		source: "",
		description: "",
		email: "",
		phone: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		console.log(form);

		// API call here
		// await fetch("/api/contact", {
		//   method: "POST",
		//   headers: {
		//     "Content-Type": "application/json",
		//   },
		//   body: JSON.stringify(form),
		// });

		setForm({
			name: "",
			role: "",
			projectType: "",
			source: "",
			description: "",
			email: "",
			phone: "",
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full mx-auto px-8 py-10 font-onest"
		>
			<div className="space-y-12 text-xl">

				<div className="flex items-center gap-4 border-b border-zinc-800 pb-4">
					<span>Hello! My name is</span>

					<input
						name="name"
						value={form.name}
						onChange={handleChange}
						placeholder="Your Name*"
						className="flex-1 bg-transparent outline-none text-zinc-400"
					/>
				</div>

				<div className="flex items-center gap-4 border-b border-zinc-800 pb-4">
					<span>and I am</span>

					<input
						name="role"
						value={form.role}
						onChange={handleChange}
						placeholder="(example: CEO company)*"
						className="flex-1 bg-transparent outline-none text-zinc-400"
					/>
				</div>

				<div className="flex items-center gap-4 border-b border-zinc-800 pb-4">
					<span>I am reaching out regarding</span>

					<select
						name="projectType"
						value={form.projectType}
						onChange={(e) =>
							setForm((prev) => ({
								...prev,
								projectType: e.target.value,
							}))
						}
						className="bg-transparent outline-none text-[#F04D5A]"
					>
						<option value="">Select</option>
						<option value="Branding">Branding</option>
						<option value="UI/UX Design">UI/UX Design</option>
						<option value="Web Development">Web Development</option>
						<option value="Motion Design">Motion Design</option>
						<option value="Creative Direction">Creative Direction</option>
						<option value="Other">Other</option>
					</select>
				</div>

				<div className="flex items-center gap-4 border-b border-zinc-800 pb-4">
					<span>I know you through</span>

					<select
						name="source"
						value={form.source}
						onChange={(e) =>
							setForm((prev) => ({
								...prev,
								source: e.target.value,
							}))
						}
						className="bg-transparent outline-none text-[#F04D5A]"
					>
						<option value="">Select</option>
						<option value="Google">Google</option>
						<option value="Instagram">Instagram</option>
						<option value="LinkedIn">LinkedIn</option>
						<option value="Referral">Referral</option>
						<option value="Behance">Behance</option>
						<option value="Dribbble">Dribbble</option>
						<option value="Other">Other</option>
					</select>
				</div>

				<div className="border-b border-zinc-800 pb-4">
					<div className="flex gap-4 mb-4">
						<span>In short,</span>

						<span className="text-zinc-500">
							Here's a brief description of my request*
						</span>
					</div>

					<textarea
						name="description"
						value={form.description}
						onChange={handleChange}
						rows={4}
						className="w-full resize-none bg-transparent outline-none text-2xl"
					/>
				</div>

				<div className="flex items-center gap-4 border-b border-zinc-800 pb-4">
					<span>I’ll leave my contacts:</span>

					<input
						name="email"
						value={form.email}
						onChange={handleChange}
						placeholder="Your Email*"
						className="flex-1 bg-transparent outline-none text-zinc-400"
					/>
				</div>

				<div className="border-b border-zinc-800 pb-4">
					<input
						name="phone"
						value={form.phone}
						onChange={handleChange}
						placeholder="Your Phone Number*"
						className="w-full bg-transparent outline-none text-zinc-400"
					/>
				</div>

				<div className="pt-4">
					<p>Looking forward to your reply!!</p>
				</div>

				{/* Your custom button goes here */}
				<button className="group relative w-fit h-10 px-5 border-2 rounded-xl border-black dark:border-white flex items-center justify-center overflow-hidden" type="submit">
					<div className="absolute inset-0 bg-[#ff2d55] origin-bottom scale-y-0 transition-transform duration-500 ease-in-out group-hover:scale-y-100 rounded-xl" />
					<span className="relative z-10"><SlidingText text="SUBMIT" /></span>
				</button>

			</div>
		</form>
	);
}