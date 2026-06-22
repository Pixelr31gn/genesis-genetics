"use client";

import { useState } from "react";

const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.82;
const SKIP_COMPRESSION_BELOW = 1.5 * 1024 * 1024;

async function compressImage(file: File): Promise<File> {
  if (file.size <= SKIP_COMPRESSION_BELOW) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY)
    );
    if (!blob || blob.size >= file.size) return file;

    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", {
      type: "image/jpeg",
    });
  } catch {
    return file;
  }
}

export default function ImageField({
  currentImageUrl,
}: {
  currentImageUrl?: string | null;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl ?? null
  );
  const [status, setStatus] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) {
      setPreviewUrl(currentImageUrl ?? null);
      setStatus(null);
      return;
    }

    const originalSize = file.size;
    setStatus(
      originalSize > SKIP_COMPRESSION_BELOW ? "Optimizing image…" : null
    );

    const optimized = await compressImage(file);
    if (optimized !== file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(optimized);
      input.files = dataTransfer.files;
    }

    setPreviewUrl(URL.createObjectURL(optimized));
    setStatus(
      optimized.size < originalSize
        ? `Optimized for upload: ${(originalSize / 1024 / 1024).toFixed(
            1
          )}MB → ${(optimized.size / 1024 / 1024).toFixed(1)}MB`
        : null
    );
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
        {status ? (
          <p className="text-xs text-[#00FF41]/70 mt-2">{status}</p>
        ) : currentImageUrl ? (
          <p className="text-xs text-white/30 mt-2">
            Leave blank to keep the current image.
          </p>
        ) : null}
      </div>
    </div>
  );
}
