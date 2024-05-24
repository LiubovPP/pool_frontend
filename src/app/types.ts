import { UserRole } from "./enums"


export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: UserRole
  phoneNumber: string
  password?: string
  status?: "CONFIRMED" | "PENDING"
}

export interface Product {
  id: number
  title: string
  description: string
  price: number
  imageUrl: string
}

export interface OrderProduct {
  id: number
  orderId: number
  productId: number
  quantity: number
}

export interface CartProduct {
  id: number
  cartId: number
  productId: number
  quantity: number
}

export interface Cart {
  id: number
  products: CartProduct[]
}
export { UserRole }

