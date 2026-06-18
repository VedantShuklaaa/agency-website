import Marquee from "@/components/marquee/marquee1";
import ContactUs from "@/components/contactUsCard/contactUs";
import Reveal from "@/components/marquee/reveal";
import Hero from "@/components/servicesPage/hero";
import HoverCards from "@/components/servicesPage/hoverCards";
import Feature from "@/components/servicesPage/featuredCards";
import AboutUs from "@/components/servicesPage/about";
import DetailCard from "@/components/servicesPage/details";

export const metadata = {
	title: "Services | Wildboys Tribe",
	description: "Full spectrum of venue business development — from strategy and audience growth to event design and execution.",
  };

export default function Page() {
	return (
		<div className="w-full bg-[background] font-twid">
			<Hero />

			<Reveal>
				<Marquee text="services©" />
			</Reveal>
			<DetailCard />

			<HoverCards />

			<Reveal>
				<Marquee text="featured works©" />
			</Reveal>
			<Feature />

			<Reveal>
				<Marquee text="process©" />
			</Reveal>
			<AboutUs />

			<Reveal>
				<Marquee text="contact©" />
			</Reveal>
			<ContactUs />
		</div>
	)
}



