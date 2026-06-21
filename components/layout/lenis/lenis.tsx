"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider() {
	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.4,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			wheelMultiplier: 0.8,
			touchMultiplier: 1.5,
		});

		lenis.on("scroll", ScrollTrigger.update);

		const rafFn = (time: number) => lenis.raf(time * 1000);
		gsap.ticker.add(rafFn);
		gsap.ticker.lagSmoothing(0);

		setTimeout(() => ScrollTrigger.refresh(), 100)

		return () => {
			lenis.destroy();
			gsap.ticker.remove(rafFn);
		};
	}, []);

	return null;
}