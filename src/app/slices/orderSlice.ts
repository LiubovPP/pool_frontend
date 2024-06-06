import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { Order } from "@app/types"
import type { RootState } from "@app/store"

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null
}

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axios.get("/api/orders", { withCredentials: true })
  return response.data
})

export const fetchOrderById = createAsyncThunk<Order, number, { state: RootState; rejectValue: string }>(
  "orders/fetchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/orders/${id}`, { withCredentials: true })
      return response.data
    } catch (error) {
      return rejectWithValue("Ошибка при получении заказа по ID")
    }
  }
)

export const createOrder = createAsyncThunk<Order, Omit<Order, "id">, { state: RootState; rejectValue: string }>(
  "orders/createOrder",
  async (orderData, { getState, rejectWithValue }) => {
    const state = getState()
    const user = state.auth.user

    if (!user) {
      return rejectWithValue("Пользователь не авторизован")
    }

    if (state.auth.isAuthenticated) {
      try {
        const order = {
          ...orderData,
          userId: user.id,
          products: state.cart.cart?.products.map(product => ({ ...product, orderId: user.id }))
        }
        const response = await axios.post("/api/orders", order, { withCredentials: true })
        return response.data
      } catch (error) {
        return rejectWithValue("Ошибка при создании заказа")
      }
    } else {
      return rejectWithValue("Неавторизованный доступ")
    }
  }
)

export const updateOrder = createAsyncThunk("orders/updateOrder", async (order: Order) => {
  const response = await axios.put(`/api/orders/${order.id}`, order, {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  })
  return response.data
})

export const deleteOrder = createAsyncThunk("orders/deleteOrder", async (id: number) => {
  await axios.delete(`/api/orders/${id}`, { withCredentials: true })
  return id
})

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Не удалось загрузить заказы"
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders.push(action.payload)
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        const index = state.orders.findIndex((order) => order.id === action.payload.id)
        if (index !== -1) {
          state.orders[index] = action.payload
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<number>) => {
        state.orders = state.orders.filter((order) => order.id !== action.payload)
      })
  }
})

export default ordersSlice.reducer