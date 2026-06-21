import { login } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="relative mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-[#00FF41]/30 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#00FF41] shadow-[0_0_12px_2px_rgba(0,255,65,0.8)]" />
          </span>
          <h1 className="text-lg font-light tracking-wide">Genesis Genetics</h1>
          <p className="text-[10px] tracking-[0.35em] text-white/40 uppercase mt-1">
            Staff Access
          </p>
        </div>

        <form
          action={login}
          className="border border-white/10 rounded-2xl bg-white/[0.03] p-6 space-y-4"
        >
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-white/40">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#00FF41]/40 transition"
            />
          </div>

          {error ? (
            <p className="text-sm text-red-400/80">Incorrect password.</p>
          ) : null}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
