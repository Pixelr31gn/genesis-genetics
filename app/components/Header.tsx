import Image from "next/image";
import CartIcon from "./CartIcon";
import HeaderSearch from "./HeaderSearch";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Genesis Genetics"
            width={1251}
            height={589}
            priority
            className="h-10 sm:h-12 w-auto"
          />
          <p className="hidden sm:block text-[9px] tracking-[0.35em] text-white/40 uppercase leading-none">
            Biotechnology
            <br />
            Division
          </p>
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
