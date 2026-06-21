import type { Product } from "@/lib/db";
import ImageField from "./ImageField";

export default function ProductForm({
  action,
  product,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  product?: Product;
  submitLabel: string;
}) {
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
