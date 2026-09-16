import "dotenv/config";
import cors from "cors";
import express from "express";
import type { Book } from "./types";

const app = express();
const port = Number(process.env.API_PORT ?? 4000);

const books: Book[] = [
  { id: "1", title: "The Hobbit", author: "J. R. R. Tolkien", price: 350 },
  { id: "2", title: "1984", author: "George Orwell", price: 280 },
];

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/books", (_req, res) => {
  res.json({ data: books });
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((item) => item.id === req.params.id);

  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  res.json({ data: book });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
