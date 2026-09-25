import "dotenv/config";
import cors from "cors";
import express from "express";
import type { Book, CartItem } from "./types";

const app = express();
const port = Number(process.env.API_PORT ?? 4000);

const books: Book[] = [
  { id: "1", title: "The Hobbit", author: "J. R. R. Tolkien", price: 350 },
  { id: "2", title: "1984", author: "George Orwell", price: 280 },
];

const cart: CartItem[] = [];

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

app.get("/api/cart", (_req, res) => {
  res.json({ data: cart });
});

app.post("/api/cart", (req, res) => {
  const bookId = req.body?.bookId;
  const book = books.find((item) => item.id === bookId);

  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  const existing = cart.find((item) => item.bookId === bookId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ bookId, quantity: 1 });
  }

  res.status(201).json({ data: cart });
});

app.delete("/api/cart/:bookId", (req, res) => {
  const index = cart.findIndex((item) => item.bookId === req.params.bookId);

  if (index === -1) {
    res.status(404).json({ error: "Cart item not found" });
    return;
  }

  cart.splice(index, 1);
  res.json({ data: cart });
});

app.post("/api/checkout", (_req, res) => {
  if (cart.length === 0) {
    res.status(400).json({ error: "Cart is empty" });
    return;
  }

  cart.length = 0;
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
