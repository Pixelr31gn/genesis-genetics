"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "gg_legal_accept_v1";

export default function LegalGate() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (accepted === "1") {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  function handleAgree() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  function handleExit() {
    window.location.href = "https://www.google.com";
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl px-6 py-10">
      <div className="w-full max-w-md border border-white/10 rounded-[28px] bg-gradient-to-b from-white/[0.05] to-black/40 p-8">
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#00FF41]/70 border border-[#00FF41]/20 rounded-full px-3 py-1.5 bg-[#00FF41]/5">
          Research Use Only
        </span>

        <h2 className="mt-6 text-2xl font-light tracking-tight">
          Before You Enter
        </h2>

        <div className="mt-5 space-y-3 text-sm text-white/60 leading-relaxed">
          <p>
            You must be 18 years of age or older, or the legal age of
            majority in your jurisdiction, to access this site.
          </p>
          <p>
            All products offered are intended strictly for laboratory
            research, in-vitro studies, and non-human research use only.
            Products are not for human consumption or veterinary use.
          </p>
          <p className="text-white/40">
            By entering, you agree to our{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00FF41] hover:underline"
            >
              Terms &amp; Conditions
            </a>{" "}
            and acknowledge that you have read and accepted them.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleExit}
            className="py-3 rounded-full border border-white/15 text-white/60 text-sm hover:border-white/30 hover:text-white transition"
          >
            Exit
          </button>
          <button
            type="button"
            onClick={handleAgree}
            className="py-3 rounded-full bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition"
          >
            I Agree &amp; Enter Site
          </button>
        </div>
      </div>
    </div>
  );
}
