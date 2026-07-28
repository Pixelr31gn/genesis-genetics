"use client";

import { useState } from "react";

export default function ImageField({
  currentImageUrl,
}: {
  currentImageUrl?: string | null;
}) {
  const [preview, setPreview] = useState(currentImageUrl ?? "");

  return (
    <div className="flex items-start gap-4">
      <div className="h-20 w-20 rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden flex-shrink-0">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full object-cover"
            onError={() => {}}
          />
        ) : null}
      </div>
      <div className="flex-1">
        <input
          name="imageUrl"
          type="text"
          defaultValue={currentImageUrl ?? ""}
          placeholder="/products/slug.png  or  https://..."
          onChange={(e) => setPreview(e.target.value.trim())}
          className="field w-full"
        />
        <p className="text-xs text-white/30 mt-2">
          Place the file in <code>public/products/</code>, push to git, then enter the path here (e.g. <code>/products/ghk-cu.png</code>).
        </p>
      </div>
    </div>
  );
}
