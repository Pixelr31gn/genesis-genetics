import type { Post, Product } from "@/lib/db";

const CLUSTERS = [
  "Peptide Fundamentals",
  "Recovery Research (BPC-157/TB-500)",
  "GH Secretagogue Research",
  "Metabolic Peptide Research",
  "Longevity & Mitochondrial Research",
  "Neuro & Inflammation Research",
  "Lab Methodology & Compliance",
];

export default function PostForm({
  action,
  post,
  submitLabel,
  allProducts,
  allPosts,
  selectedProductIds = [],
  selectedRelatedPostIds = [],
}: {
  action: (formData: FormData) => void;
  post?: Post;
  submitLabel: string;
  allProducts: Product[];
  allPosts: Post[];
  selectedProductIds?: number[];
  selectedRelatedPostIds?: number[];
}) {
  const relatedPostCandidates = allPosts.filter((p) => p.id !== post?.id);

  return (
    <form action={action} className="space-y-5">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}

      <Field label="Title">
        <input
          name="title"
          required
          defaultValue={post?.title}
          className="field"
        />
      </Field>

      <Field label="Research Cluster">
        <select
          name="cluster"
          defaultValue={post?.cluster || CLUSTERS[0]}
          className="field"
        >
          {CLUSTERS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Excerpt (shown on /research index)">
        <textarea
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt ?? ""}
          className="field resize-none"
        />
      </Field>

      <Field label="Meta Description (SEO, ~155 chars)">
        <input
          name="meta_description"
          maxLength={160}
          defaultValue={post?.meta_description ?? ""}
          className="field"
        />
      </Field>

      <Field label="Content (Markdown)">
        <textarea
          name="content"
          rows={16}
          required
          defaultValue={post?.content ?? ""}
          className="field resize-none font-mono text-sm"
        />
      </Field>

      <Field label="Linked Products">
        {allProducts.length === 0 ? (
          <p className="text-sm text-white/30">No products to link yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-white/10 rounded-xl p-3">
            {allProducts.map((p) => (
              <label
                key={p.id}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <input
                  type="checkbox"
                  name="productIds"
                  value={p.id}
                  defaultChecked={selectedProductIds.includes(p.id)}
                  className="accent-[#00FF41]"
                />
                {p.name}
              </label>
            ))}
          </div>
        )}
      </Field>

      <Field label="Related Posts">
        {relatedPostCandidates.length === 0 ? (
          <p className="text-sm text-white/30">
            Add more posts to start cross-linking.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-white/10 rounded-xl p-3">
            {relatedPostCandidates.map((p) => (
              <label
                key={p.id}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <input
                  type="checkbox"
                  name="relatedPostIds"
                  value={p.id}
                  defaultChecked={selectedRelatedPostIds.includes(p.id)}
                  className="accent-[#00FF41]"
                />
                {p.title}
              </label>
            ))}
          </div>
        )}
      </Field>

      <Field label="Published">
        <label className="flex items-center gap-2 text-sm text-white/70">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published ?? true}
            className="accent-[#00FF41]"
          />
          Visible on /research
        </label>
      </Field>

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition"
      >
        {submitLabel}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-white/40">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
