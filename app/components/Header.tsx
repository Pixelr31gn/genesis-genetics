import CartIcon from "./CartIcon";
import HeaderSearch from "./HeaderSearch";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center gap-3">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#00FF41]/30">
            <span className="h-2 w-2 rounded-full bg-[#00FF41] shadow-[0_0_12px_2px_rgba(0,255,65,0.8)]" />
          </span>
          <div>
            <h1 className="text-base font-light tracking-wide leading-none">
              Genesis Genetics
            </h1>
            <p className="text-[9px] tracking-[0.35em] text-white/40 uppercase leading-none mt-1">
              Biotechnology Division
            </p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-white/50">
          <a href="/#compounds" className="hover:text-white transition">
            Compounds
          </a>
          <a href="/standards" className="hover:text-white transition">
            Standards
          </a>
          <a href="/research" className="hover:text-white transition">
            Research
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <HeaderSearch />
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
