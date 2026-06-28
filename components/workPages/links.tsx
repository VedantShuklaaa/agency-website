"use client";
import { useState } from "react";
import { SentenceRoll } from "../layout/navAnimation/navAnimation";
import SlidingText from "../layout/aboutUsButton/aboutUsButton";
import BottomDesc from "../layout/bottomDesc/bottomDesc";


export default function Links() {
	return (
		<div className="flex flex-col w-full gap-3 border-b border-zinc-100 dark:border-zinc-900 bg-background">
			<div className="p-4 flex flex-col gap-2">
				<UnderlineHover>
					<SentenceRoll className="text-xl font-onest" text="Office: Banglore, Pune. India" />
				</UnderlineHover>
				<UnderlineHover>
					<SentenceRoll className="text-xl font-onest" text="Follow us on instagram" />
				</UnderlineHover>
				<UnderlineHover>
					<SentenceRoll className="text-xl font-onest" text="connect@creativeapes.design" />
				</UnderlineHover>
			</div>


			<div className="flex flex-col gap-10 w-full p-4">
				<span className="py-2 w-full flex flex-col gap-4 lg:px-20 xl:px-60 2xl:px-100">
					<span className="">
						<p className="text-heading-lg">We partner with ambitious businesses across nightlife, entertainment, and hospitality to build destinations, experiences, and brands that move the industry forward.</p>
					</span>
					<span className="">
						<p className="text-body-sm text-zinc-400 ">Whether you&apos;re launching something new, transforming an existing destination, or exploring a strategic partnership, this is where the conversation begins.</p>
					</span>
				</span>

				<ContactForm />
			</div>

			<BottomDesc text1="© Featured Projects" text2="(CAD® — 02)" text3="Digital Showcase" className="text-black dark:text-zinc-400" />
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
			<div className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#FF0000] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
		</div>
	);
}

export function ContactForm() {
	const [form, setForm] = useState({
		name: "",
		entityType: "",
		roleTitle: "",
		focus: "",
		impactArea: "",
		timeline: "",
		source: "",
		description: "",
		email: "",
		phone: "",
		website: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSelectChange = (name: keyof typeof form) => (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setForm((prev) => ({
			...prev,
			[name]: e.target.value,
		}));
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

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
			entityType: "",
			roleTitle: "",
			focus: "",
			impactArea: "",
			timeline: "",
			source: "",
			description: "",
			email: "",
			phone: "",
			website: "",
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full mx-auto flex flex-col gap-5 py-5 lg:px-20 xl:px-60 2xl:px-100 font-onest"
		>
			<div className="space-y-2 text-body-md">

				{/* Name */}
				<div className="flex items-center gap-4 border-b border-zinc-800 pb-4">
					<span>Hello! My name is</span>

					<input
						name="name"
						value={form.name}
						onChange={handleChange}
						placeholder="Your Name*"
						className="flex-1 bg-transparent outline-none text-zinc-600"
					/>
				</div>

				{/* Entity + role */}
				<div className="flex flex-wrap items-center gap-4 border-b border-zinc-800 pb-4">
					<span>and I lead</span>

					<select
						name="entityType"
						value={form.entityType}
						onChange={handleSelectChange("entityType")}
						className="bg-transparent outline-none text-[#FF0000]"
					>
						<option value="">Select</option>
						<option value="Venue">Venue</option>
						<option value="Brand">Brand</option>
						<option value="Company">Company</option>
					</select>

					<span>As</span>

					<select
						name="roleTitle"
						value={form.roleTitle}
						onChange={handleSelectChange("roleTitle")}
						className="bg-transparent outline-none text-[#FF0000]"
					>
						<option value="">Select</option>
						<option value="Founder">Founder</option>
						<option value="Owner">Owner</option>
						<option value="Investor">Investor</option>
						<option value="Partner">Partner</option>
						<option value="Manager">Manager</option>
						<option value="Other">Other</option>
					</select>
				</div>

				{/* Current focus */}
				<div className="flex flex-wrap items-center gap-4 border-b border-zinc-800 pb-4">
					<span>Right now, we&rsquo;re focused on</span>

					<select
						name="focus"
						value={form.focus}
						onChange={handleSelectChange("focus")}
						className="bg-transparent outline-none text-[#FF0000]"
					>
						<option value="">Select</option>
						<option value="Launching a New Venture">Launching a New Venture</option>
						<option value="Growing an Existing Destination">Growing an Existing Destination</option>
						<option value="Building a Hospitality Brand">Building a Hospitality Brand</option>
						<option value="Building an Entertainment Business">Building an Entertainment Business</option>
						<option value="Creating a Cultural Property">Creating a Cultural Property</option>
						<option value="Finding a Long-Term Operating Partner">Finding a Long-Term Operating Partner</option>
						<option value="Exploring a Strategic Partnership">Exploring a Strategic Partnership</option>
						<option value="Exploring an Investment Opportunity">Exploring an Investment Opportunity</option>
						<option value="Something Else">Something else</option>
					</select>
				</div>

				{/* Impact area */}
				<div className="border-b border-zinc-800 pb-4">
					<p className="mb-2">Where would you like WILDBOYS to create the greatest impact?</p>

					<div className="flex flex-wrap items-center gap-4">
						<span>(Select)</span>

						<select
							name="impactArea"
							value={form.impactArea}
							onChange={handleSelectChange("impactArea")}
							className="bg-transparent outline-none text-[#FF0000]"
						>
							<option value="">Select</option>
							<option value="Strategy & Intelligence">Strategy & Intelligence</option>
							<option value="Brand & Culture">Brand & Culture</option>
							<option value="Programming & Experiences">Programming & Experiences</option>
							<option value="Talent & Partnerships">Talent & Partnerships</option>
							<option value="Community & Demand">Community & Demand</option>
							<option value="Operations & Performance">Operations & Performance</option>
							<option value="Complete WILDBOYS Operating System">Complete WILDBOYS Operating System</option>
							<option value="Not Sure Yet">Not Sure Yet — Let&apos;s Explore Together</option>
						</select>
					</div>
				</div>

				{/* Timeline */}
				<div className="flex flex-wrap items-center gap-4 border-b border-zinc-800 pb-4">
					<span>We&rsquo;re planning to begin</span>

					<select
						name="timeline"
						value={form.timeline}
						onChange={handleSelectChange("timeline")}
						className="bg-transparent outline-none text-[#FF0000]"
					>
						<option value="">Select</option>
						<option value="Immediately">Immediately</option>
						<option value="Within 15 Days">Within 15 Days</option>
						<option value="Within 1-3 Months">Within 1-3 Month</option>
						<option value="Exploring Opportunities">Exploring Opportunities</option>
					</select>
				</div>

				{/* Source */}
				<div className="flex flex-wrap items-center gap-4 border-b border-zinc-800 pb-4">
					<span>We discovered WILDBOYS through</span>

					<select
						name="source"
						value={form.source}
						onChange={handleSelectChange("source")}
						className="bg-transparent outline-none text-[#FF0000]"
					>
						<option value="">Select</option>
						<option value="Instagram">Instagram</option>
						<option value="Google">Google</option>
						<option value="Referral">Referral</option>
						<option value="Client">Client</option>
						<option value="Event">Event</option>
						<option value="LinkedIn">LinkedIn</option>
						<option value="Community">Community</option>
						<option value="Other">Other</option>
					</select>
				</div>

				{/* Vision description */}
				<div className="border-b border-zinc-800 pb-4">
					<div className="flex flex-wrap gap-4 mb-4">
						<span>Describe the destination you&rsquo;re trying to create.</span>
						<span className="text-zinc-500">Here&rsquo;s a brief description of your vision*</span>
					</div>

					<textarea
						name="description"
						value={form.description}
						onChange={handleChange}
						rows={4}
						className="w-full resize-none bg-transparent outline-none text-2xl"
					/>
				</div>

				{/* Email */}
				<div className="flex items-center gap-4 border-b border-zinc-800 pb-4">
					<span>You can reach us at</span>

					<input
						name="email"
						value={form.email}
						onChange={handleChange}
						placeholder="Your Email*"
						className="flex-1 bg-transparent outline-none text-zinc-600"
					/>
				</div>

				{/* Phone */}
				<div className="border-b border-zinc-800 pb-4">
					<input
						name="phone"
						value={form.phone}
						onChange={handleChange}
						placeholder="your Phone number"
						className="w-full bg-transparent outline-none text-zinc-600"
					/>
				</div>

				{/* Website / Instagram (optional) */}
				<div className="border-b border-zinc-800 pb-4">
					<input
						name="website"
						value={form.website}
						onChange={handleChange}
						placeholder="Website / Instagram (Optional)"
						className="w-full bg-transparent outline-none text-zinc-600"
					/>
				</div>
			</div>

			<div className="pt-4 flex justify-center">
				<div className="flex flex-col items-center">
					<p>Every conversation is reviewed personally!!!</p>
					<p>If we believe we&rsquo;re the right partner for your vision, we&apos;ll be in touch within 48 hours.</p>
				</div>
			</div>

			<button className="group relative w-fit h-10 px-5 mx-auto border-2 rounded-xl border-black dark:border-white flex items-center justify-center overflow-hidden" type="submit">
				<div className="absolute inset-0 bg-[#FF0000] origin-bottom scale-y-0 transition-transform duration-500 ease-in-out group-hover:scale-y-100 rounded-xl" />
				<span className="relative z-10"><SlidingText text="SUBMIT" /></span>
			</button>
		</form>
	);
}
