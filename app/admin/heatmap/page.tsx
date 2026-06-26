import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getTrackedPaths } from "@/lib/db";
import HeatmapViewer from "./HeatmapViewer";

export default async function AdminHeatmapPage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string; device?: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  const { path: pathParam, device: deviceParam } = await searchParams;
  const trackedPaths = await getTrackedPaths();
  const activePath = pathParam || trackedPaths[0]?.path || "/";
  const activeDevice = deviceParam === "mobile" ? "mobile" : "desktop";

  function pathHref(p: string) {
    return `/admin/heatmap?path=${encodeURIComponent(p)}&device=${activeDevice}`;
  }
  function deviceHref(d: "desktop" | "mobile") {
    return `/admin/heatmap?path=${encodeURIComponent(activePath)}&device=${d}`;
  }

  return (
    <main className="bg-black text-white min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-2">
              Admin
            </p>
            <h1 className="text-2xl font-light">Heatmap</h1>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-sm hover:border-white/30 hover:text-white transition"
          >
            ← Back to Catalog
          </Link>
        </div>

        {trackedPaths.length === 0 ? (
          <div className="border border-white/10 rounded-2xl bg-white/[0.03] py-16 text-center text-white/40">
            No clicks tracked yet. Data will appear here once visitors start
            browsing the site.
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {trackedPaths.map(({ path, count }) => (
                  <Link
                    key={path}
                    href={pathHref(path)}
                    className={`shrink-0 px-4 py-2 rounded-full border text-xs transition ${
                      path === activePath
                        ? "border-[#00FF41]/50 text-[#00FF41] bg-[#00FF41]/5"
                        : "border-white/15 text-white/50 hover:border-white/30"
                    }`}
                  >
                    {path === "/" ? "Home" : path} ({count})
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-2 sm:ml-auto">
                <Link
                  href={deviceHref("desktop")}
                  className={`px-4 py-2 rounded-full border text-xs uppercase tracking-[0.15em] transition ${
                    activeDevice === "desktop"
                      ? "border-[#00FF41]/50 text-[#00FF41] bg-[#00FF41]/5"
                      : "border-white/15 text-white/50 hover:border-white/30"
                  }`}
                >
                  Desktop
                </Link>
                <Link
                  href={deviceHref("mobile")}
                  className={`px-4 py-2 rounded-full border text-xs uppercase tracking-[0.15em] transition ${
                    activeDevice === "mobile"
                      ? "border-[#00FF41]/50 text-[#00FF41] bg-[#00FF41]/5"
                      : "border-white/15 text-white/50 hover:border-white/30"
                  }`}
                >
                  Mobile
                </Link>
              </div>
            </div>

            <HeatmapViewer path={activePath} device={activeDevice} />
          </>
        )}
      </div>
    </main>
  );
}
