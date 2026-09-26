export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
};

export type CartItem = {
  bookId: string;
  quantity: number;
};

export type OrderItem = {
  title: string;
  quantity: number;
  price: number;
};
