import Intro from "@/components/contactUsPage/intro";
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
		<div className="bg-[#F9DDE0] w-full overflow-hidden">
			<Intro />

			<Reveal className="bg-background">
				<Marquee text="contact us©" />
			</Reveal>
			<Links />

			<Jobs />
		</div>
	)
}

