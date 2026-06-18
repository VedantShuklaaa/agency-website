import Hero from "@/components/blogsPage/hero";
import Second from "@/components/blogsPage/seconds";

export const metadata = {
	title: "Blog | Wildboys Tribe",
	description: "Expert perspectives, industry trends, and practical wisdom from India's first nightlife growth studio.",
};

export default function Page() {
	return (
		<div className="w-full bg-[background] overflow-hidden">
			<Hero />

			<Second />
		</div>
	)
}

