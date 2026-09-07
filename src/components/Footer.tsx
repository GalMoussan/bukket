import Link from "next/link";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="page-gutter pb-20 pt-8 md:pb-28 md:pt-10">
      <div className="grid gap-8 border-t border-white/10 pt-8 text-sm md:grid-cols-3 md:gap-10">
        <div>
          <Wordmark className="mb-2 block text-base text-cream" />
          <p className="max-w-xs text-xs leading-relaxed text-muted">
            The original portable gravity bong. Engineered for smooth hits,
            built to last.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">Shop</p>
          <ul className="space-y-1.5 text-muted">
            <li>
              <Link href="/#product" className="hover:text-cream">
                Bukket
              </Link>
            </li>
            <li>
              <Link href="/#features" className="hover:text-cream">
                Replacement Parts
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-2">Support</p>
          <ul className="space-y-1.5 text-muted">
            <li>
              <a href="#" className="hover:text-cream">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cream">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cream">
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-2 pb-8 text-[11px] text-muted md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} Bukket. All rights reserved.</p>
        <p>For tobacco use only. Must be 21+ to purchase.</p>
      </div>
    </footer>
  );
}
