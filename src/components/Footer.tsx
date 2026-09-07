import Link from "next/link";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="page-gutter py-12 md:py-16">
      <div className="rounded-[16px] border-2 border-vast bg-linen px-6 py-10 md:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Wordmark className="mb-3 block text-xl" />
            <p className="max-w-xs text-sm leading-relaxed text-grey-700">
              The original portable gravity bong. Engineered for smooth hits,
              built to last.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3">Shop</p>
            <ul className="space-y-2 text-sm text-grey-700">
              <li>
                <Link href="/#product" className="hover:text-vast">
                  Bukket
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-vast">
                  Replacement Parts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3">Support</p>
            <ul className="space-y-2 text-sm text-grey-700">
              <li>
                <a href="#" className="hover:text-vast">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-vast">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-vast">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t-2 border-vast/15 pt-6 text-xs text-grey-700 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Bukket. All rights reserved.</p>
          <p>For tobacco use only. Must be 21+ to purchase.</p>
        </div>
      </div>
    </footer>
  );
}
