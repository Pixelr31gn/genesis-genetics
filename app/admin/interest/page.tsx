import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getProductInterestRanking } from "@/lib/db";

export default async function AdminInterestPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  const ranking = await getProductInterestRanking(30);
  const hasAnyData = ranking.some(
    (r) => r.views + r.hovers + r.detail_views + r.add_to_carts + r.purchases > 0
  );

  return (
    <main className="bg-black text-white min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-2">
              Admin
            </p>
            <h1 className="text-2xl font-light">Product Interest</h1>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-sm hover:border-white/30 hover:text-white transition"
          >
            ← Back to Catalog
          </Link>
        </div>
        <p className="text-sm text-white/40 mb-10 max-w-2xl">
          Last 30 days. Score is relative to whichever product has the most
          weighted activity right now — views, hovers, detail-page visits,
          cart-adds, and purchases, weighted toward the steps that mean more.
          It's a ranking, not an absolute grade. Products with this much
          interest feed the &quot;Customers Are Looking At&quot; section on
          the homepage automatically.
        </p>

        {!hasAnyData ? (
          <div className="border border-white/10 rounded-2xl bg-white/[0.03] py-16 text-center text-white/40">
            No interest data yet. This fills in as visitors browse the site.
          </div>
        ) : (
          <div className="overflow-x-auto border border-white/10 rounded-2xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-white/40 text-xs uppercase tracking-[0.15em]">
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3 text-right">Score</th>
                  <th className="px-4 py-3 text-right">Views</th>
                  <th className="px-4 py-3 text-right">Hovers</th>
                  <th className="px-4 py-3 text-right">Detail Views</th>
                  <th className="px-4 py-3 text-right">Cart Adds</th>
                  <th className="px-4 py-3 text-right">Purchases</th>
                  <th className="px-4 py-3 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((r, i) => (
                  <tr
                    key={r.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3 text-white/40">{i + 1}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/compounds/${r.slug}`}
                        className="text-white/80 hover:text-[#00FF41] transition"
                      >
                        {r.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`inline-flex items-center justify-center w-10 h-7 rounded-full text-xs font-medium ${
                          r.score >= 50
                            ? "bg-[#00FF41]/15 text-[#00FF41]"
                            : "bg-white/5 text-white/50"
                        }`}
                      >
                        {r.score}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-white/60">{r.views}</td>
                    <td className="px-4 py-3 text-right text-white/60">{r.hovers}</td>
                    <td className="px-4 py-3 text-right text-white/60">{r.detail_views}</td>
                    <td className="px-4 py-3 text-right text-white/60">{r.add_to_carts}</td>
                    <td className="px-4 py-3 text-right text-white/60">{r.purchases}</td>
                    <td className="px-4 py-3 text-right text-white/60">
                      ${r.revenue.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
