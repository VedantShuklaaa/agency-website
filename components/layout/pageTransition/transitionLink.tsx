"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";

interface Props {
	href: string;
	children: React.ReactNode;
	className?: string;
}

export default function TransitionLink({
	href,
	children,
	className,
}: Props) {
	const router = useRouter();

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
		<Link
			href={href}
			onClick={handleClick}
			className={className}
		>
			{children}
		</Link>
	);
}