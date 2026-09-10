import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();
const port = Number(process.env.API_PORT ?? 4000);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/books", (_req, res) => {
  res.json({
    data: [
      { id: "1", title: "The Hobbit", author: "J. R. R. Tolkien", price: 350 },
      { id: "2", title: "1984", author: "George Orwell", price: 280 },
    ],
  });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
