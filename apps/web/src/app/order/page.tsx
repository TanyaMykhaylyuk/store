import Link from "next/link";
import type { OrderItem } from "@store/types";

type OrderResponse = {
  data: OrderItem[];
};

async function getOrder(): Promise<OrderItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  const res = await fetch(`${apiUrl}/api/order`, { cache: "no-store" });

  if (!res.ok) {
    return [];
  }

  const json = (await res.json()) as OrderResponse;
  return json.data;
}

export default async function OrderPage() {
  const items = await getOrder();
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <main>
      <h1>Order placed</h1>
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            {item.title} × {item.quantity}
          </li>
        ))}
      </ul>
      <p>{total}</p>
      <p>
        <Link href="/">Back</Link>
      </p>
    </main>
  );
}
