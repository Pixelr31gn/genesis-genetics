"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function HeaderSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/?q=${encodeURIComponent(q)}#compounds` : "/#compounds");
  }

  function openSearch() {
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "w-40 sm:w-60" : "w-0"
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => !value && setOpen(false)}
          placeholder="Search compounds, categories…"
          className="w-40 sm:w-60 bg-black/60 border border-white/15 rounded-full text-sm text-white/80 placeholder:text-white/30 outline-none focus:border-[#00FF41]/40 transition px-4 py-2"
        />
      </div>
      <button
        type={open ? "submit" : "button"}
        onClick={() => !open && openSearch()}
        aria-label="Search compounds"
        className="flex items-center justify-center h-9 w-9 rounded-full border border-white/15 hover:border-[#00FF41]/40 transition shrink-0"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-white/70">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}
