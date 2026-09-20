import Link from "next/link";
import { notFound } from "next/navigation";
import type { Book } from "@store/types";
import { AddToCartButton } from "./add-to-cart-button";

type BookResponse = {
  data: Book;
};

async function getBook(id: string): Promise<Book | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  const res = await fetch(`${apiUrl}/api/books/${id}`, { cache: "no-store" });

  if (!res.ok) {
    return null;
  }

  const json = (await res.json()) as BookResponse;
  return json.data;
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  return (
    <main>
      <p>
        <Link href="/">Back</Link>
        {" · "}
        <Link href="/cart">Cart</Link>
      </p>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.price}</p>
      <AddToCartButton bookId={book.id} />
    </main>
  );
}
