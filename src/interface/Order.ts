export type Orders = Order[];

export interface Order {
  id: string;
  userId: string;
  address: string;
  total: number;
  status: string;
  createdAt: string;
  products: Product[];
  user: User;
}

export interface Product {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  product: Product2;
}

export interface Product2 {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  categoryId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  telefone: string;
}
