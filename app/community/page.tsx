import HeaderPara from "@/components/communityPage/headerPara";
import Second from "@/components/communityPage/second";
import ContactUs from "@/components/contactUsCard/contactUs";
import { Skiper30 } from "@/components/layout/skipper/skipper";



export default function CommunityPage() {
	return (
		<div className="w-full relative bg-[background] overflow-hidden">
			<HeaderPara />

			<Second />

			<div className="mt-10">
				<Skiper30 />
			</div>

			<ContactUs />
		</div>
	);
}