import Link from "next/link";
import type { OrderItem } from "@store/types";

type OrdersResponse = {
  data: OrderItem[][];
};

async function getOrders(): Promise<OrderItem[][]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  const res = await fetch(`${apiUrl}/api/orders`, { cache: "no-store" });

  if (!res.ok) {
    return [];
  }

  const json = (await res.json()) as OrdersResponse;
  return json.data;
}

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <main>
      <p>
        <Link href="/">Back</Link>
      </p>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((items, index) => {
          const total = items.reduce((sum, item) => sum + item.price, 0);

          return (
            <section key={index}>
              <ul>
                {items.map((item) => (
                  <li key={item.title}>
                    {item.title} × {item.quantity}
                  </li>
                ))}
              </ul>
              <p>{total}</p>
            </section>
          );
        })
      )}
    </main>
  );
}
