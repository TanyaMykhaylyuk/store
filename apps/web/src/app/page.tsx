import Link from "next/link";
import type { Book } from "@store/types";

type BooksResponse = {
  data: Book[];
};

async function getBooks(): Promise<Book[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  const res = await fetch(`${apiUrl}/api/books`, { cache: "no-store" });

  if (!res.ok) {
    return [];
  }

  const json = (await res.json()) as BooksResponse;
  return json.data;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const books = await getBooks();
  const query = q.trim().toLowerCase();
  const visible = query
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query),
      )
    : books;

  return (
    <main>
      <h1>Bookstore</h1>
      <p>Buy books online.</p>
      <p>
        <Link href="/cart">Cart</Link>
        {" · "}
        <Link href="/orders">Orders</Link>
      </p>
      <form>
        <input name="q" defaultValue={q} />
        <button type="submit">Search</button>
      </form>
      {visible.length === 0 ? (
        <p>No books found</p>
      ) : (
        <ul>
          {visible.map((book) => (
            <li key={book.id}>
              <Link href={`/books/${book.id}`}>
                {book.title} — {book.author} ({book.price})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
