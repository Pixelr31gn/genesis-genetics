"use client";

import { useState } from "react";

export default function ImageField({
  currentImageUrl,
}: {
  currentImageUrl?: string | null;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl ?? null
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPreviewUrl(currentImageUrl ?? null);
      return;
    }
    setPreviewUrl(URL.createObjectURL(file));
  }

  return (
    <div className="flex items-center gap-4">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="h-20 w-20 rounded-xl object-cover border border-white/10"
        />
      ) : (
        <div className="h-20 w-20 rounded-xl border border-white/10 bg-white/[0.03]" />
      )}
      <div className="flex-1">
        <input
          name="imageFile"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="field text-white/60"
        />
        {currentImageUrl ? (
          <p className="text-xs text-white/30 mt-2">
            Leave blank to keep the current image.
          </p>
        ) : null}
      </div>
    </div>
  );
}
