"use client";

import { useRouter } from "next/navigation";

export function RemoveFromCartButton({ bookId }: { bookId: string }) {
  const router = useRouter();

  async function remove() {
    await fetch(`/api/cart/${bookId}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button type="button" onClick={remove}>
      Remove
    </button>
  );
}
