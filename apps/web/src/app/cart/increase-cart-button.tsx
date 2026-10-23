"use client";

import { useRouter } from "next/navigation";

export function IncreaseCartButton({ bookId }: { bookId: string }) {
  const router = useRouter();

  async function increase() {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId }),
    });
    router.refresh();
  }

  return (
    <button type="button" onClick={increase}>
      +
    </button>
  );
}
