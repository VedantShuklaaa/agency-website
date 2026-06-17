import Image from "next/image";
import TiltCard from "../layout/tiltCard/tiltCard";


export default function Hero() {
	return (
		<div className="h-screen w-full flex flex-col lg:flex-row items-center justify-center relative bg-[#ff2d55] leading-none">
			<div className="lg:h-full w-full flex flex-col items-center lg:items-start justify-center lg:justify-start text-black z-30 py-5 lg:px-10 lg:py-20">
				<span>
					<p className="text-black text-display-md md:text-display-lg lg:text-display-md font-druk z-30 flex">EXPERTISE</p>
				</span>
				<span className="text-center lg:text-start 2xl:w-[30vw]">
					<p className="text-heading-md md:text-heading-lg">We don't just build for launch day. We build for everything that came before it, and it <span className="italic font-[600]">growth</span> that comes after it.</p>
				</span>
			</div>

			<div className="h-full w-full flex items-center justify-center">
				<div className="grid place-items-center">
					{/* Front Card */}
					<div className="col-start-1 row-start-1 z-10 relative">
						<TiltCard
							tilt="-2"
							className="h-[500px] w-[350px] 2xl:h-[800px] 2xl:w-[700px]"
						/>

						<Image
							src="/1.png"
							alt="Front Card"
							fill
							className="object-cover pointer-events-none"
						/>
					</div>

					{/* Back Card */}
					<div className="col-start-1 row-start-1 relative">
						<TiltCard
							tilt="2"
							className="h-[500px] w-[350px] 2xl:h-[800px] 2xl:w-[700px]"
						/>

						<Image
							src="/2.png"
							alt="Back Card"
							fill
							className="object-cover pointer-events-none"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}