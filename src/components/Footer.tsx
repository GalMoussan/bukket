export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#08080d] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="mb-3 text-xl font-bold tracking-widest">BUKKET</p>
            <p className="text-sm leading-relaxed text-white/40">
              The original portable gravity bong. Engineered for smooth hits,
              built to last.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60">
              Shop
            </p>
            <ul className="space-y-2 text-sm text-white/40">
              <li>
                <a href="#product" className="transition hover:text-white">
                  Bukket
                </a>
              </li>
              <li>
                <a href="#features" className="transition hover:text-white">
                  Replacement Parts
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60">
              Support
            </p>
            <ul className="space-y-2 text-sm text-white/40">
              <li>
                <a href="#" className="transition hover:text-white">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/30 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Bukket. All rights reserved.</p>
          <p>For tobacco use only. Must be 21+ to purchase.</p>
        </div>
      </div>
    </footer>
  );
}