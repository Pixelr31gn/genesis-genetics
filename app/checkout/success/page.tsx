import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; method?: string; total?: string }>;
}) {
  const { code, method, total } = await searchParams;

  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      <Header />

      <section className="px-6 pt-32 pb-28 max-w-xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/70 border border-[#00FF41]/20 rounded-full px-4 py-1.5 bg-[#00FF41]/5">
          Order Received
        </span>

        <h1 className="mt-8 text-3xl md:text-4xl font-light">
          Thank You{code ? `, Order ${code}` : ""}
        </h1>

        {method === "zelle" ? (
          <div className="mt-8 border border-white/10 rounded-2xl bg-white/[0.03] p-6 text-left">
            <p className="text-white/60 leading-relaxed">
              Send <span className="text-white">${total ?? ""}</span> via Zelle
              to <span className="text-[#00FF41]">8017160941</span> and include
              this code in the memo:
            </p>
            <p className="mt-4 text-2xl font-light text-[#00FF41] tracking-wide">
              {code}
            </p>
            <p className="mt-4 text-sm text-white/40 leading-relaxed">
              Your order will be marked paid once we confirm the transfer
              matching this code. Keep this code for your records.
            </p>
          </div>
        ) : (
          <p className="mt-6 text-white/50 leading-relaxed">
            Your PayPal payment was confirmed. We&apos;ll be in touch shortly
            with shipping details.
          </p>
        )}

        <Link
          href="/"
          className="inline-flex mt-10 px-6 py-3 rounded-full border border-white/15 text-white/70 text-sm hover:border-white/30 hover:text-white transition"
        >
          Back to Home
        </Link>
      </section>

      <Footer />
    </main>
  );
}
