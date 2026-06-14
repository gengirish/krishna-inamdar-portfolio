import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Krishna Inamdar | Walmart Account Manager & Analytics Leader",
  description:
    "Walmart Account Manager at L&R Distributors. Data analysis, e-commerce marketplaces (Walmart, Amazon, Shopify), regional operations, and SQL/Excel reporting — based in Old Bridge, New Jersey.",
  keywords: [
    "Krishna Inamdar",
    "Walmart Account Manager",
    "L&R Distributors",
    "Walmart Marketplace",
    "Data Analyst",
    "SQL",
    "E-commerce",
    "Shopify",
    "Amazon",
    "Marketplace Manager",
    "POOLCORP",
    "Old Bridge",
    "CHARUSAT",
    "MS Computer Information Systems",
  ],
  authors: [{ name: "Krishna Inamdar", url: "https://www.linkedin.com/in/krishnainamdar25/" }],
  metadataBase: new URL("https://krishna-inamdar-portfolio.vercel.app"),
  alternates: {
    canonical: "https://krishna-inamdar-portfolio.vercel.app",
  },
  openGraph: {
    title: "Krishna Inamdar | Walmart Account Manager & Analytics Leader",
    description:
      "Data analysis and e-commerce professional: Walmart marketplace and account work, multi-channel marketplaces, regional operations, and SQL/Excel analytics.",
    type: "website",
    locale: "en_US",
    url: "https://krishna-inamdar-portfolio.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishna Inamdar | Walmart Account Manager & Analytics Leader",
    description:
      "Walmart Account Manager and data/e-commerce professional — marketplaces, KPIs, SQL & Excel, MS in Computer Information Systems.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
      data-theme="light"
    >
      <body className="font-sans">
        <Script id="portfolio-theme-boot" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("portfolio-theme");document.documentElement.setAttribute("data-theme",t==="dark"||t==="light"?t:"light");}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
