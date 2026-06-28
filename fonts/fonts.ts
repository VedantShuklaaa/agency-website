import localFont from "next/font/local";
import { Anton } from "next/font/google";

// fonts/fonts.ts
export const onest = localFont({
  src: "./Onest-VariableFont_wght.woff2",
  variable: "--font-onest",
  display: "swap",
});

export const twidGrotesk = localFont({
  src: "./TwidGrotesk-Regular.woff2",
  variable: "--font-twid",
  display: "block",
});

export const drukWide = localFont({
  src: "./DrukCond-Super-Trial.woff2",
  variable: "--font-druk",
  display: "block",
});

export const dagestan = localFont({
  src: "./DagestaN.ttf",
  variable: "--font-dage",
  display: "swap",
});

export const august = localFont({
  src: "./August.woff2",
  variable: "--font-august",
  display: "swap",
});

export const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
});