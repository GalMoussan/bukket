import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SmokeLayer from "@/components/SmokeLayer";
import ContactView from "@/components/ContactView";

export const metadata: Metadata = {
  title: "Contact us — the BUKKET experience",
  description:
    "Write Bukket at Kibbutz Regavim. Name, phone, email, and country — we will get back to you.",
};

export default function ContactPage() {
  return (
    <>
      <SmokeLayer />
      <Header />
      <main>
        <ContactView />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
