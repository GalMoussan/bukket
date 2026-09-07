import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AgeGate from "@/components/AgeGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bukket — The Original Portable Gravity Bong",
  description:
    "Shop the Bukket gravity bong in 4 bold colors. Portable, durable, and engineered for smooth hits. Free shipping on orders over $50.",
  openGraph: {
    title: "Bukket — The Original Portable Gravity Bong",
    description:
      "Shop the Bukket gravity bong in 4 bold colors. Portable, durable, and engineered for smooth hits.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <CartProvider>
          <AgeGate />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}