import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MacDiskCleaner — Clean Your Mac the Smart Way",
  description: "The most powerful and intuitive Mac storage cleaner. Find large files, remove duplicates, and uninstall apps cleanly. Free to download.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0A0E1A] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
