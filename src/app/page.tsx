import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ColorShowcase from "@/components/ColorShowcase";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import PressClipping from "@/components/PressClipping";
import FunVideo from "@/components/FunVideo";
import CartDrawer from "@/components/CartDrawer";
import StickyBuyBar from "@/components/StickyBuyBar";
import Footer from "@/components/Footer";
import SmokeLayer from "@/components/SmokeLayer";

export default function Home() {
  return (
    <>
      <SmokeLayer />
      <Header />
      <main>
        <Hero />
        <ColorShowcase />
        <HowItWorks />
        <Features />
        <PressClipping />
        <FunVideo />
      </main>
      <Footer />
      <CartDrawer />
      <StickyBuyBar />
    </>
  );
}
