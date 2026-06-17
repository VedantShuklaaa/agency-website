"use client";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
	Autoplay,
	EffectCoverflow,
	Navigation,
	Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";
import { cn } from "@/lib/utils"; import { useState } from "react";

function SlideImage({
	src,
	alt,
	index,
}: {
	src: string;
	alt: string;
	index: number;
}) {
	const [failed, setFailed] = useState(false);

	const color = fallbackColors[index % fallbackColors.length];

	if (failed) {
		return (
			<div
				className="flex h-full w-full items-center justify-center"
				style={{ backgroundColor: color }}
			>
				<span className="text-sm font-medium text-white">
					Image unavailable
				</span>
			</div>
		);
	}

	return (
		<img
			src={src}
			alt={alt}
			className="h-full w-full object-cover"
			onError={() => setFailed(true)}
		/>
	);
}

const fallbackColors = [
	"#E75361",
	"#B39DDB",
	"#80CBC4",
	"#FFCC80",
	"#90CAF9",
	"#A5D6A7",
	"#F48FB1",
	"#CE93D8",
];

const Skiper49 = () => {
	const images = [
		{
			src: "/1.png",
			alt: "Illustrations by my fav AarzooAly",
		},
		{
			src: "/2.png",
			alt: "Illustrations by my fav AarzooAly",
		},
		{
			src: "/3.png",
			alt: "Illustrations by my fav AarzooAly",
		},
		{
			src: "/4.png",
			alt: "Illustrations by my fav AarzooAly",
		},
		{
			src: "/5.png",
			alt: "Illustrations by my fav AarzooAly",
		},
		{
			src: "5.png",
			alt: "Illustrations by my fav AarzooAly",
		},
		{
			src: "6.png",
			alt: "Illustrations by my fav AarzooAly",
		},

	];

	return (
		<div className="flex h-full w-full items-center justify-center overflow-hidden">
			<Carousel_003 className="" images={images} showPagination loop />
		</div>
	);
};

export { Skiper49 };

const Carousel_003 = ({
	images,
	className,
	showPagination = false,
	showNavigation = false,
	loop = true,
	autoplay = false,
	spaceBetween = 0,
}: {
	images: { src: string; alt: string }[];
	className?: string;
	showPagination?: boolean;
	showNavigation?: boolean;
	loop?: boolean;
	autoplay?: boolean;
	spaceBetween?: number;
}) => {
	const css = `
  .Carousal_003 {
    width: 100%;
    height: 350px;
    padding-bottom: 50px !important;
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
  }

  .swiper-pagination-bullet {
    background-color: #000 !important;
  }

`;
	return (
		<motion.div
			initial={{ opacity: 0, translateY: 20 }}
			animate={{ opacity: 1, translateY: 0 }}
			transition={{
				duration: 0.3,
				delay: 0.5,
			}}
			className={cn("relative w-full max-w-4xl px-5", className)}
		>
			<style>{css}</style>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
				className="w-full"
			>
				<Swiper
					spaceBetween={spaceBetween}
					autoplay={autoplay ? {
						delay: 1500,
						disableOnInteraction: true,
					}
						: false
					}
					effect="coverflow"
					grabCursor={true}
					slidesPerView="auto"
					centeredSlides={true}
					loop={loop}
					coverflowEffect={{
						rotate: 40,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: true,
					}}
					pagination={showPagination ? {
						clickable: true,
					}
						: false
					}
					navigation={showNavigation ? {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					}
						: false
					}
					className="Carousal_003"
					modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
				>
					{images.map((image, index) => (
						<SwiperSlide key={index}>
							<SlideImage
								src={image.src}
								alt={image.alt}
								index={index}
							/>
						</SwiperSlide>
					))}
					{showNavigation && (
						<div>
							<div className="swiper-button-next after:hidden">
								<ChevronRightIcon className="h-6 w-6 text-white" />
							</div>
							<div className="swiper-button-prev after:hidden">
								<ChevronLeftIcon className="h-6 w-6 text-white" />
							</div>
						</div>
					)}
				</Swiper>
			</motion.div>
		</motion.div>
	);
};

export { Carousel_003 };
