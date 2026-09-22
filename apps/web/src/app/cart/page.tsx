import Link from "next/link";
import type { Book, CartItem } from "@store/types";
import { RemoveFromCartButton } from "./remove-from-cart-button";

type CartResponse = {
  data: CartItem[];
};

type BooksResponse = {
  data: Book[];
};

async function getCart(): Promise<CartItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  const res = await fetch(`${apiUrl}/api/cart`, { cache: "no-store" });

  if (!res.ok) {
    return [];
  }

  const json = (await res.json()) as CartResponse;
  return json.data;
}

async function getBooks(): Promise<Book[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  const res = await fetch(`${apiUrl}/api/books`, { cache: "no-store" });

  if (!res.ok) {
    return [];
  }

  const json = (await res.json()) as BooksResponse;
  return json.data;
}

export default async function CartPage() {
  const [items, books] = await Promise.all([getCart(), getBooks()]);
  const total = items.reduce((sum, item) => {
    const book = books.find((entry) => entry.id === item.bookId);
    return sum + (book?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <main>
      <p>
        <Link href="/">Back</Link>
      </p>
      <h1>Cart</h1>
      <ul>
        {items.map((item) => {
          const book = books.find((entry) => entry.id === item.bookId);

          return (
            <li key={item.bookId}>
              {book?.title ?? item.bookId} × {item.quantity}{" "}
              <RemoveFromCartButton bookId={item.bookId} />
            </li>
          );
        })}
      </ul>
      <p>{total}</p>
    </main>
  );
}
