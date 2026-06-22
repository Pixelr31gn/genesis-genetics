export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
        <p>Genesis Genetics © {new Date().getFullYear()}</p>
        <p className="text-xs text-white/20 text-center sm:text-right max-w-md">
          For research use only. Not for human or veterinary consumption.
        </p>
        <div className="flex items-center gap-4">
          <a href="/track-order" className="text-white/20 hover:text-white/50 transition">
            Track Order
          </a>
          <a href="/admin/login" className="text-white/20 hover:text-white/50 transition">
            Staff Login
          </a>
        </div>
      </div>
    </footer>
  );
}
