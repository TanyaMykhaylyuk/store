"use client";

export function AddToCartButton({ bookId }: { bookId: string }) {
  async function add() {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId }),
    });
  }

  return (
    <button type="button" onClick={add}>
      Add to cart
    </button>
  );
}
