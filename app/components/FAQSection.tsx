export type FAQItem = { question: string; answer: string };

export default function FAQSection({ items }: { items: FAQItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="mt-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group border border-white/10 rounded-2xl bg-white/[0.03] p-5 open:border-[#00FF41]/20"
          >
            <summary className="cursor-pointer text-sm font-medium text-white/80 list-none flex items-center justify-between gap-4 group-open:text-[#00FF41]">
              {item.question}
              <span className="text-white/30 group-open:text-[#00FF41] group-open:rotate-45 transition-transform shrink-0">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-white/50 leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
