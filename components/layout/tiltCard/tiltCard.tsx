"use client";
interface TiltCardProps {
	children?: React.ReactNode;
	className?: string;
	cardClassName?: string;
	tilt?: string,
}

export default function TiltCard({
	children,
	className = "",
	cardClassName = "",
	tilt = "4"
}: TiltCardProps) {
	return (
		<div
			className={`relative ${className}`}
			style={{
				perspective: "1200px",
			}}
		>
			<div
				className={`tilt-card h-full w-full bg-[#938ACF] shadow-[0_30px_80px_rgba(0,0,0,0.25)] relative overflow-hidden ${cardClassName}`}
				data-tilt={tilt}
				style={{
					transformStyle: "preserve-3d",
				}}
			>
				{children}
			</div>
		</div>
	);
}


interface TiltCard2Props {
	children?: React.ReactNode;
	className?: string;
	cardClassName?: string;
	tilt?: string;
}

export function TiltCard2({
	children,
	className = "",
	cardClassName = "",
	tilt = "4",
}: TiltCard2Props) {
	return (
		<div className={`relative ${className}`}>
			<div
				className={`tilt-card h-full w-full bg-[#938ACF] shadow-[0_30px_80px_rgba(0,0,0,0.25)] relative overflow-hidden ${cardClassName}`}
				style={{
					transform: `rotate(${tilt}deg)`,
				}}
			>
				{children}
			</div>
		</div>
	);
}