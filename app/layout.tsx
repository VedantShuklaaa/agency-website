import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { dagestan, drukWide, onest, twidGrotesk } from "@/fonts/fonts";
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/layout/navbar/navbar";
import { LoaderWrapper } from "@/components/layout/loader/loader";
import "./globals.css";
import CursorDot from "@/components/layout/cursorDot/cursorDot";
import Footer from "@/components/layout/footer/footer";
import PageTransition from "@/components/layout/pageTransition/pageTransition";
import LenisProvider from "@/components/layout/lenis/lenis";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      className={`${geistSans.variable} ${geistMono.variable} ${onest.variable} ${twidGrotesk.variable} ${drukWide.variable} ${dagestan.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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

