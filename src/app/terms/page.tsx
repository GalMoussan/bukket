import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SmokeLayer from "@/components/SmokeLayer";
import TermsView from "@/components/TermsView";

export const metadata: Metadata = {
  title: "Terms — the BUKKET experience",
  description:
    "General Terms and Conditions for Bukket.com, including age requirements, orders, delivery, warranty, and liability.",
};

export default function TermsPage() {
  return (
    <>
      <SmokeLayer />
      <Header />
      <main>
        <TermsView />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
