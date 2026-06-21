export default function PageTransition() {
	return (
		<div
			id="page-transition"
			className="fixed inset-0 z-[9998] bg-black pointer-events-none"
			style={{ transform: "translateY(100%)" }}
		/>
	);
}