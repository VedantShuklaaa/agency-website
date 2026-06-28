import type { Metadata } from "next";
import { anton, august, dagestan, drukWide, onest, twidGrotesk } from "@/fonts/fonts";
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/layout/navbar/navbar";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CursorDot from "@/components/layout/cursorDot/cursorDot";
import Footer from "@/components/layout/footer/footer";
import PageTransition from "@/components/layout/pageTransition/pageTransition";
import LenisProvider from "@/components/layout/lenis/lenis";
import ScrollToTop from "@/components/layout/scrollToTop/scrollToTop";

export const metadata: Metadata = {
  title: "Wildboys Tribe | Nightlife & Entertainment Architects",
  description: "India's First Nightlife & Entertainment Growth Studio. We design operating systems that make venues culturally relevant, community-led, and consistently engaging.",
  keywords: ["nightlife", "entertainment", "venue management", "India", "Pune", "Bangalore"],
  openGraph: {
    title: "Wildboys Tribe",
    description: "India's First Nightlife & Entertainment Growth Studio",
    url: "https://yourdomain.com",
    siteName: "Wildboys Tribe",
    type: "website",
  },
  metadataBase: new URL("https://yourdomain.com"),
  alternates: {
    canonical: "/",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${onest.variable} ${twidGrotesk.variable} ${drukWide.variable} ${dagestan.variable} ${august.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SpeedInsights />
          <ScrollToTop />
          <LenisProvider />
          <PageTransition />
          <CursorDot />
          <Navbar />

          <main className="pt-20">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}