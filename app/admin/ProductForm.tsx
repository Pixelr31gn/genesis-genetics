import type { Product } from "@/lib/db";
import ImageField from "./ImageField";

export default function ProductForm({
  action,
  product,
  submitLabel,
  allProducts,
  selectedRelatedIds = [],
}: {
  action: (formData: FormData) => void;
  product?: Product;
  submitLabel: string;
  allProducts: Product[];
  selectedRelatedIds?: number[];
}) {
  const candidates = allProducts.filter((p) => p.id !== product?.id);
  return (
    <form action={action} className="space-y-5">
      {product ? <input type="hidden" name="id" value={product.id} /> : null}

      <Field label="Name">
        <input
          name="name"
          required
          defaultValue={product?.name}
          className="field"
        />
      </Field>

      <div className="grid grid-cols-2 gap-5">
        <Field label="Category">
          <input
            name="category"
            defaultValue={product?.category || "Research Compound"}
            className="field"
          />
        </Field>
        <Field label="Stock">
          <input
            name="stock"
            type="number"
            min={0}
            defaultValue={product?.stock ?? 0}
            className="field"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Field label="Purity">
          <input
            name="purity"
            placeholder="e.g. 99.2%"
            defaultValue={product?.purity ?? ""}
            className="field"
          />
        </Field>
        <Field label="Dosage">
          <input
            name="dosage"
            placeholder="e.g. 10mg/mL"
            defaultValue={product?.dosage ?? ""}
            className="field"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Field label="Price (USD)">
          <input
            name="price"
            type="number"
            step="0.01"
            min={0}
            required
            defaultValue={product?.price}
            className="field"
          />
        </Field>
        <Field label="Discount (%)">
          <input
            name="discount_percent"
            type="number"
            step="1"
            min={0}
            max={30}
            defaultValue={product?.discount_percent ?? 0}
            className="field"
          />
          <p className="text-xs text-white/30 mt-2">
            0 = no discount. Max 30%. Shows as a sale badge on the storefront.
          </p>
        </Field>
      </div>

      <Field label="Image">
        <ImageField
          currentImageUrl={product?.image_type ? `/api/images/${product.id}` : null}
        />
      </Field>

      <Field label="Description">
        <textarea
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
          className="field resize-none"
        />
      </Field>

      <Field label="Recommended With (Complete the Stack)">
        {candidates.length === 0 ? (
          <p className="text-sm text-white/30">
            Add more products to start curating a stack.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-white/10 rounded-xl p-3">
            {candidates.map((p) => (
              <label
                key={p.id}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <input
                  type="checkbox"
                  name="relatedIds"
                  value={p.id}
                  defaultChecked={selectedRelatedIds.includes(p.id)}
                  className="accent-[#00FF41]"
                />
                {p.name}
              </label>
            ))}
          </div>
        )}
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
