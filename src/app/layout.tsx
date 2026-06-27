import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naman Lad | Full Stack Developer & AI Engineer",
  description: "Portfolio of Naman Lad, a Full Stack Developer specializing in Generative AI, React.js, and Node.js. Based in Bhilwara, Rajasthan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark antialiased h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/30 relative">
        {children}
      </body>
    </html>
  );
}
