"use client";

import { useRouter } from "next/navigation";

export function AddToCartButton({ bookId }: { bookId: string }) {
  const router = useRouter();

  async function add() {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId }),
    });

    if (res.ok) {
      router.push("/cart");
    }
  }

  return (
    <button type="button" onClick={add}>
      Add to cart
    </button>
  );
}
