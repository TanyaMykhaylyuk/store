"use client";

import { useRouter } from "next/navigation";

export function CheckoutButton() {
  const router = useRouter();

  async function checkout() {
    await fetch("/api/checkout", { method: "POST" });
    router.refresh();
  }

  return (
    <button type="button" onClick={checkout}>
      Checkout
    </button>
  );
}
