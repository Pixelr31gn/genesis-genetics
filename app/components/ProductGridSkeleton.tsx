export default function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-[28px] border border-white/10 bg-white/[0.03] overflow-hidden"
        >
          <div className="aspect-[4/5] bg-white/5 animate-pulse" />
          <div className="p-6 space-y-3">
            <div className="h-4 w-2/3 bg-white/10 rounded-full animate-pulse" />
            <div className="h-3 w-1/3 bg-white/5 rounded-full animate-pulse" />
            <div className="h-10 w-full bg-white/5 rounded-xl animate-pulse mt-5" />
          </div>
        </div>
      ))}
    </div>
  );
}
