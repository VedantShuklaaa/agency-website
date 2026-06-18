import CardStack from "@/components/layout/cardStack/cardStack";
import Marquee from "@/components/marquee/marquee1";
import Reveal from "@/components/marquee/reveal";
import Details from "@/components/workPages/details";
import Hero from "@/components/workPages/hero";
import Second from "@/components/workPages/second";
import Works from "@/components/workPages/works";

export const metadata = {
	title: "Work | Wildboys Tribe",
	description: "Past events, campaigns, and projects by Wildboys Tribe.",
};

export default function Page() {

	return (
		<div className="bg-[background] w-full overflow-hidden">
			<Hero />

			<Second />

			<Details />

			<Reveal>
				<Marquee text="past events©" />
			</Reveal>
			<Works />

			<div className="w-full flex border-t border-zinc-100 dark:border-zinc-900">
				<Marquee text="@Intellectual Property" />
			</div>
			<CardStack />
		</div>
	)
}


