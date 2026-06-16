"use client";
import CardStack from "@/components/layout/cardStack/cardStack";
import Marquee from "@/components/marquee/marquee1";
import Reveal from "@/components/marquee/reveal";
import Details from "@/components/workPages/details";
import Hero from "@/components/workPages/hero";
import Second from "@/components/workPages/second";
import Works from "@/components/workPages/works";

export default function Page() {

	return (
		<div className="bg-[background] w-full">
			<Hero />

			<Second />

			<Details />

			<Reveal>
				<Marquee text="past events©" />
			</Reveal>
			<Works />

			<div className="w-full flex border-t border-black dark:border-zinc-600">
				<Marquee text="@Intellectual Property" />
			</div>
			<CardStack />
		</div>
	)
}


