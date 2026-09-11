import type { Metadata } from "next";
import { Outfit, Assistant, Playpen_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AgeGate from "@/components/AgeGate";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const playpen = Playpen_Sans({
  variable: "--font-playpen",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "the BUKKET experience — The Original Portable Gravity Bong",
  description:
    "Shop the Bukket gravity bong in 4 bold colors. Portable, durable, and engineered for smooth hits. Free shipping on orders over $50.",
  openGraph: {
    title: "the BUKKET experience — The Original Portable Gravity Bong",
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
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${assistant.variable} ${playpen.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-night text-cream">
        <div className="site-aura" aria-hidden="true">
          <span className="site-aura-wash" />
          <span className="site-aura-ring site-aura-ring-a" />
          <span className="site-aura-ring site-aura-ring-b" />
        </div>
        <div className="relative z-10">
          <CartProvider>
            <AgeGate />
            {children}
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
