import Marquee from "@/components/marquee/marquee1";
import Reveal from "@/components/marquee/reveal";
import Jobs from "@/components/workPages/jobs";
import Links from "@/components/workPages/links";

export const metadata = {
	title: "Contact | Wildboys Tribe",
	description: "Start a conversation. Every message is read by a partner.",
};

export default function Page() {
	return (
		<div className="bg-[background] w-full overflow-hidden">
			<div className="py-5 w-full flex flex-col items-center justify-center bg-pink-200 gap-4 md:gap-20 leading-none">
				<span className="leading-none">
					<h1 className="text-display-sm sm:text-display-lg tracking-tighter text-black text-center font-bold font-druk">IT STARTS WITH A CONVERSATION</h1>
				</span>

				<span className="px-2 md:px-20 lg:px-50 2xl:px-110">
					<p className="text-black text-heading-lg text-center font-twid">If you're considering working together, this is the right place to start. Every message is read by a partner.</p>
				</span>
			</div>

			<Reveal>
				<Marquee text="contact us©" />
			</Reveal>
			<Links />

			<Jobs />
		</div>
	)
}

