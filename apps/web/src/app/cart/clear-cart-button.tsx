"use client";

import { useRouter } from "next/navigation";

export function ClearCartButton() {
  const router = useRouter();

  async function clear() {
    await fetch("/api/cart", { method: "DELETE" });
    router.refresh();
  }

  return (
    <button type="button" onClick={clear}>
      Clear cart
    </button>
  );
}
