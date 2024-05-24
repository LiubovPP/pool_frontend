import { UserRole } from "./enums"


export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  status?: "CONFIRMED" | "PENDING";
}

export interface UserWithPassword extends User {
  password: string;
}

export interface Product {
  id: number
  title: string
  category: string
  price: number
  imageUrl: string
}

export interface OrderProduct {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  summa: number;
  itemsCount: number;
  date: string;
  products: OrderProduct[];
}

export interface CartProduct {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  price: number; 
}

export interface Cart {
  id: number
  products: CartProduct[]
}
export { UserRole }

