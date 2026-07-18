import "@/styles/main.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { DevTools } from "@/components/dev-tools";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skills.sanmid.com"),
  title: {
    default:
      "Design, frontend, and design-engineering skills for humans and agents",
    template: "%s — Skills",
  },
  description:
    "A curated collection of community design, frontend, and design-engineering skills for humans and agents.",
  openGraph: {
    title:
      "Design, frontend, and design-engineering skills for humans and agents",
    description:
      "A curated collection of community design, frontend, and design-engineering skills for humans and agents.",
    url: "https://skills.sanmid.com",
    siteName: "Skills",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {process.env.NODE_ENV === "development" ? (
          <Script
            src="https://unpkg.com/react-scan/dist/auto.global.js"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        <main className="mx-auto flex min-h-screen w-full max-w-[920px] flex-col px-6 py-16">
          <article className="flex-1">{children}</article>
          <SiteFooter />
        </main>
        <DevTools />
      </body>
    </html>
  );
}
