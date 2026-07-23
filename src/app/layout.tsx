import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raj Tripathi | CS Engineer & Competitive Programmer",
  description: "Portfolio of Raj Tripathi, a Computer Science Engineering student at Chandigarh University, Competitive Programmer, and Backend Java Developer.",
  keywords: ["Raj Tripathi", "Competitive Programming", "Java Developer", "Software Engineer", "Chandigarh University", "LeetCode", "Codeforces", "Data Structures", "Algorithms", "Portfolio"],
  authors: [{ name: "Raj Tripathi" }],
  openGraph: {
    title: "Raj Tripathi | CS Engineer & Competitive Programmer",
    description: "Portfolio of Raj Tripathi, a Computer Science Engineering student at Chandigarh University, Competitive Programmer, and Backend Java Developer.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raj Tripathi | CS Engineer & Competitive Programmer",
    description: "Computer Science Engineer, Competitive Programmer, and Java Developer.",
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
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-purple-500/30 selection:text-purple-200">
        {children}
      </body>
    </html>
  );
}
