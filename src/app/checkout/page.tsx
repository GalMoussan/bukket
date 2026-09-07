import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutView from "@/components/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout — Bukket",
  description: "Review your Bukket order. Payment coming soon.",
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main>
        <CheckoutView />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
