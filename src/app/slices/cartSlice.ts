import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import type { Cart, CartProduct } from "@app/types"
import type { RootState } from "@app/store"

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const getCartFromLocalStorage = (): Cart | null => {
  try {
    const cartData = localStorage.getItem("cart")
    if (cartData && cartData !== "undefined") {
      return JSON.parse(cartData) as Cart
    }
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error)
  }
  return null
}

const saveCartToLocalStorage = (cart: Cart) => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

const initialState: CartState = {
  cart: getCartFromLocalStorage(),
  loading: false,
  error: null
}

export const fetchCart = createAsyncThunk<
  Cart | null,
  void,
  { state: RootState; rejectValue: string }
>(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    const state = getState()
    if (state.auth.isAuthenticated) {
      try {
        const response = await axios.get("/api/cart/cart-products", {
          withCredentials: true
        })
        return { id: 1, products: response.data }
      } catch (error) {
        return rejectWithValue("Ошибка при получении корзины")
      }
    }
    return null
  }
)

export const addToCart = createAsyncThunk<CartProduct, Omit<CartProduct, "id">, {
  state: RootState;
  rejectValue: string
}>(
  "cart/addToCart",
  async (product, { getState, rejectWithValue }) => {
    const state = getState()
    if (state.auth.isAuthenticated) {
      try {
        const response = await axios.post(
          "/api/cart/cart-products/product",
          {
            productId: product.productId,
            quantity: product.quantity
          },
          { withCredentials: true }
        )
        return response.data
      } catch (error) {
        return rejectWithValue("Ошибка при добавлении товара в корзину")
      }
    } else {
      return rejectWithValue("Неавторизованный доступ")
    }
  }
)

export const removeFromCart = createAsyncThunk<CartProduct, number, { state: RootState; rejectValue: string }>(
  "cart/removeFromCart",
  async (product, { getState, rejectWithValue }) => {
    const state = getState()
    if (state.auth.isAuthenticated) {
      try {
        const res = await axios.delete(`/api/cart/cart-products/${product}`, {
          withCredentials: true
        })
        return res.data
      } catch (error) {
        return rejectWithValue("Ошибка при удалении товара из корзины")
      }
    } else {
      return rejectWithValue("Неавторизованный доступ")
    }
  }
)

export const clearCart = createAsyncThunk<
  void,
  void,
  { state: RootState; rejectValue: string }
>(
  "cart/clearCart",
  async (_, { getState, rejectWithValue }) => {
    const state = getState()
    const isAuthenticated = state.auth.isAuthenticated
    if (isAuthenticated) {
      try {
        await axios.delete("/api/cart/cart-products", { withCredentials: true })
        return
      } catch (error) {
        return rejectWithValue("Ошибка при очистке корзины")
      }
    } else {
      localStorage.removeItem("cart")
      return
    }
  }
)

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToLocalCart: (state, action: PayloadAction<Omit<CartProduct, "id">>) => {
      if (!state.cart) {
        state.cart = { id: -1, products: [] }
      }
      const existingProduct = state.cart.products.find(
        (p) => p.productId === action.payload.productId
      )
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity
      } else {
        state.cart.products.push({ id: state.cart.products.length + 1, ...action.payload })
      }
      saveCartToLocalStorage(state.cart)
    },

    removeFromLocalCart: (state, action) => {
      if (state.cart) {
        state.cart.products = state.cart.products.filter(
          (product) => product.productId !== action.payload
        )
        saveCartToLocalStorage(state.cart)
      }
    },
    updateLocalCartProduct: (state, action: PayloadAction<CartProduct>) => {
      if (state.cart) {
        const index = state.cart.products.findIndex((product) => product.id === action.payload.id)
        if (index !== -1) {
          state.cart.products[index] = action.payload
          saveCartToLocalStorage(state.cart)
        }
      }
    },
    clearLocalCart: (state) => {
      state.cart = null
      localStorage.removeItem("cart")
    },
    syncCartWithLocal: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload
      saveCartToLocalStorage(state.cart)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart | null>) => {
        state.loading = false
        state.cart = action.payload
        if (action.payload) {
          saveCartToLocalStorage(action.payload)
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Ошибка при получении корзины"
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartProduct>) => {
        if (state.cart) {
          const existingProduct = state.cart.products.find(
            (p) => p.productId === action.payload.productId
          )
          if (existingProduct) {
            existingProduct.quantity += action.payload.quantity
          } else {
            state.cart.products.push(action.payload)
          }
          saveCartToLocalStorage(state.cart)
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.products = state.cart.products.filter((product) => product.productId !== action.payload.productId)
          saveCartToLocalStorage(state.cart)
        }
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = null
        localStorage.removeItem("cart")
      })
  }
})

export const {
  addToLocalCart,
  removeFromLocalCart,
  updateLocalCartProduct,
  clearLocalCart,
  syncCartWithLocal
} = cartSlice.actions
export default cartSlice.reducer
