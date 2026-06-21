// app/page.tsx
import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import("@/components/home/homeClient"));

export default function HomePage() {
  return <HomeClient />;
}