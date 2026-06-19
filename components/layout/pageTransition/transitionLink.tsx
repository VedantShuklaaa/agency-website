"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";

interface Props {
	href: string;
	children: React.ReactNode;
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function TransitionLink({
	href,
	children,
	className,
	onClick,
}: Props) {
	const router = useRouter();

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		onClick?.(e);

		if (e.defaultPrevented) return;

		e.preventDefault();

		gsap.fromTo(
			"#page-transition",
			{ y: "100%" },
			{
				y: "0%",
				duration: 0.7,
				ease: "power4.inOut",
				onComplete: () => router.push(href),
			}
		);
	};

	return (
		<Link href={href} onClick={handleClick} className={className}>
			{children}
		</Link>
	);
}