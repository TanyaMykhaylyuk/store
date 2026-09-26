"use client";

import { useRouter } from "next/navigation";

export function CheckoutButton() {
  const router = useRouter();

  async function checkout() {
    const res = await fetch("/api/checkout", { method: "POST" });

    if (res.ok) {
      router.push("/order");
    }
  }

  return (
    <button type="button" onClick={checkout}>
      Checkout
    </button>
  );
}
