"use client";

import { useRouter } from "next/navigation";

export function DecreaseCartButton({ bookId }: { bookId: string }) {
  const router = useRouter();

  async function decrease() {
    await fetch(`/api/cart/${bookId}`, { method: "PATCH" });
    router.refresh();
  }

  return (
    <button type="button" onClick={decrease}>
      −
    </button>
  );
}
