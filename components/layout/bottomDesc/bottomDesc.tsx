

interface BottomDesc {
	className?: string,
	text1: string,
	text2?: string,
	text3: string,
}

export default function BottomDesc({
	className = "",
	text1,
	text2,
	text3,
}: BottomDesc) {
	return (
		<div className={`w-full px-4 py-3 flex items-center justify-between gap-2 text-body-md ${className}`}>
			<span>{text1}</span>
			<span>{text2}</span>
			<span>{text3}</span>
		</div>
	)
}