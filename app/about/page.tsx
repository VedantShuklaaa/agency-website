import AboutHero from "@/components/aboutUsPage/aboutHero";
import FloatCard from "@/components/aboutUsPage/floatCard";
import TeamSection from "@/components/aboutUsPage/teamSection";
import ContactUs from "@/components/contactUsCard/contactUs";
import Marquee from "@/components/marquee/marquee1";
import Reveal from "@/components/marquee/reveal";

export const metadata = {
	title: "About | Wildboys Tribe",
	description: "India's first nightlife architects and management studio.",
};

export default function Page() {
	return (
		<div className="w-full bg-background overflow-hidden">
			<AboutHero />

			<Reveal>
				<Marquee text="about apes©" />
			</Reveal>
			<FloatCard />

			<div className="w-full flex flex-col py-1 px-2 lg:px-10">
				<div className="flex flex-col p-1 border-b border-white">
					<h1 className="font-druk text-display-xl" style={{ lineHeight: "1" }}>
						BUILT BY OPERATORS
					</h1>
					<p className="text-body-md lg:text-heading-lg lg:max-w-[50vw]">
						WILDBOYS TRIBE was built by operators who experienced the industry&apos;s challenges firsthand—and built a system to solve them.
					</p>
				</div>

				<div className="h-[70vh] w-full flex">
					<TeamSection />
				</div>
			</div>

			<Reveal>
				<Marquee text="@contact us" />
			</Reveal>
			<ContactUs />
		</div>
	);
}


