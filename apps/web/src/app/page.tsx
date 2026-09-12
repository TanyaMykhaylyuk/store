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

export default async function HomePage() {
  const books = await getBooks();

  return (
    <main>
      <h1>Bookstore</h1>
      <p>Buy books online.</p>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} — {book.author} ({book.price})
          </li>
        ))}
      </ul>
    </main>
  );
}
