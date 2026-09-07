import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ColorShowcase from "@/components/ColorShowcase";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import FunVideo from "@/components/FunVideo";
import CartDrawer from "@/components/CartDrawer";
import StickyBuyBar from "@/components/StickyBuyBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ColorShowcase />
        <HowItWorks />
        <Features />
        <FunVideo />
      </main>
      <Footer />
      <CartDrawer />
      <StickyBuyBar />
    </>
  );
}