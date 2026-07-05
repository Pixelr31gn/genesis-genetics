"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import CartIcon from "./CartIcon";
import HeaderSearch from "./HeaderSearch";

const NAV_LINKS = [
  { href: "/#compounds", label: "Compounds" },
  { href: "/research", label: "Research" },
  { href: "/standards", label: "Standards" },
  { href: "/track-order", label: "Track Order" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // close on route change
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* logo */}
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Genesis Genetics"
            width={1251}
            height={589}
            priority
            className="h-8 sm:h-10 md:h-12 w-auto"
          />
          <p className="hidden sm:block text-[9px] tracking-[0.35em] text-white/40 uppercase leading-none">
            Biotechnology
            <br />
            Division
          </p>
        </a>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/50">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <HeaderSearch />
          <CartIcon />
          {/* hamburger — mobile only */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-full border border-white/15 hover:border-white/30 transition"
          >
            <span
              className={`block h-px w-4 bg-white/70 transition-all duration-200 origin-center ${
                open ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block h-px w-4 bg-white/70 transition-all duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-4 bg-white/70 transition-all duration-200 origin-center ${
                open ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* mobile dropdown */}
      {open && (
        <nav className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center px-6 py-4 text-sm text-white/70 hover:text-white hover:bg-white/[0.03] border-b border-white/5 last:border-0 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
