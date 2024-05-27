import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Cart, CartProduct } from '@app/types';
import type { RootState } from '@app/store';

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const getCartFromLocalStorage = (): Cart | null => {
  try {
    const cartData = localStorage.getItem('cart');
    if (cartData && cartData !== 'undefined') {
      return JSON.parse(cartData) as Cart;
    }
  } catch (error) {
    console.error('Error parsing cart from localStorage:', error);
  }
  return null;
};

const saveCartToLocalStorage = (cart: Cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const initialState: CartState = {
  cart: getCartFromLocalStorage(),
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk<Cart | null, number, { state: RootState; rejectValue: string }>(
  'cart/fetchCart',
  async (userId, { getState, rejectWithValue }) => {
    const state = getState();
    if (state.auth.isAuthenticated) {
      try {
        const response = await axios.get(`/api/cart/${userId}`, { withCredentials: true });
        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          try {
            const response = await axios.post(`/api/cart`, { userId }, { withCredentials: true });
            return response.data;
          } catch (createError) {
            return rejectWithValue('Ошибка при создании корзины');
          }
        }
        return rejectWithValue(error.response?.data || 'Ошибка при получении корзины');
      }
    } else {
      return getCartFromLocalStorage();
    }
  },
);

export const addToCart = createAsyncThunk<CartProduct, Omit<CartProduct, 'id'>, { state: RootState; rejectValue: string }>(
  'cart/addToCart',
  async (product, { getState, rejectWithValue }) => {
    const state = getState();
    const isAuthenticated = state.auth.isAuthenticated;
    if (isAuthenticated) {
      try {
        const cartId = state.cart.cart?.id;
        if (!cartId) throw new Error('Корзина не найдена');
        const response = await axios.post(`/api/cart/${cartId}/products`, product, { withCredentials: true });
        return response.data;
      } catch (error) {
        return rejectWithValue('Ошибка при добавлении товара в корзину');
      }
    } else {
      const cart = state.cart.cart || { id: -1, products: [] };
      const existingProduct = cart.products.find(p => p.productId === product.productId);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        cart.products.push({ id: cart.products.length + 1, ...product });
      }
      saveCartToLocalStorage(cart);
      return { id: cart.products.length, ...product };
    }
  },
);

export const updateCartProduct = createAsyncThunk<CartProduct, CartProduct, { state: RootState; rejectValue: string }>(
  'cart/updateCartProduct',
  async (cartProduct, { getState, rejectWithValue }) => {
    const state = getState();
    const isAuthenticated = state.auth.isAuthenticated;
    if (isAuthenticated) {
      try {
        const cartId = state.cart.cart?.id;
        if (!cartId) throw new Error('Корзина не найдена');
        const response = await axios.put(`/api/cart/${cartId}/cart-products/${cartProduct.id}`, cartProduct, { withCredentials: true });
        return response.data;
      } catch (error) {
        return rejectWithValue('Ошибка при обновлении товара в корзине');
      }
    } else {
      const cart = state.cart.cart || { id: -1, products: [] };
      const index = cart.products.findIndex(p => p.id === cartProduct.id);
      if (index !== -1) {
        cart.products[index] = cartProduct;
        saveCartToLocalStorage(cart);
        return cartProduct;
      } else {
        throw new Error('Товар не найден в корзине');
      }
    }
  },
);

export const removeFromCart = createAsyncThunk<number, number, { state: RootState; rejectValue: string }>(
  'cart/removeFromCart',
  async (cartProductId, { getState, rejectWithValue }) => {
    const state = getState();
    const isAuthenticated = state.auth.isAuthenticated;
    if (isAuthenticated) {
      const cartId = state.cart.cart?.id;
      if (!cartId) {
        return rejectWithValue('Корзина не найдена');
      }
      try {
        await axios.delete(`/api/cart/${cartId}/cart-products/${cartProductId}`, { withCredentials: true });
        return cartProductId;
      } catch (error) {
        return rejectWithValue('Ошибка при удалении товара из корзины');
      }
    } else {
      const cart = state.cart.cart || { id: -1, products: [] };
      cart.products = cart.products.filter(product => product.id !== cartProductId);
      saveCartToLocalStorage(cart);
      return cartProductId;
    }
  },
);

export const clearCart = createAsyncThunk<void, void, { state: RootState; rejectValue: string }>(
  'cart/clearCart',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const isAuthenticated = state.auth.isAuthenticated;
    if (isAuthenticated) {
      try {
        const cartId = state.cart.cart?.id;
        if (!cartId) throw new Error('Корзина не найдена');
        await axios.delete(`/api/cart/${cartId}`, { withCredentials: true });
        return;
      } catch (error) {
        return rejectWithValue('Ошибка при очистке корзины');
      }
    } else {
      localStorage.removeItem('cart');
      return;
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToLocalCart: (state, action: PayloadAction<Omit<CartProduct, 'id'>>) => {
      if (!state.cart) {
        state.cart = { id: -1, products: [] };
      }
      const existingProduct = state.cart.products.find(p => p.productId === action.payload.productId);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.cart.products.push({ id: state.cart.products.length + 1, ...action.payload });
      }
      saveCartToLocalStorage(state.cart);
    },
    removeFromLocalCart: (state, action: PayloadAction<number>) => {
      if (state.cart) {
        state.cart.products = state.cart.products.filter(
          (product) => product.id !== action.payload,
        );
        saveCartToLocalStorage(state.cart);
      }
    },
    updateLocalCartProduct: (state, action: PayloadAction<CartProduct>) => {
      if (state.cart) {
        const index = state.cart.products.findIndex(
          (product) => product.id === action.payload.id,
        );
        if (index !== -1) {
          state.cart.products[index] = action.payload;
          saveCartToLocalStorage(state.cart);
        }
      }
    },
    clearLocalCart: (state) => {
      state.cart = null;
      localStorage.removeItem('cart');
    },
    syncCartWithLocal: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
      saveCartToLocalStorage(state.cart);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart | null>) => {
        state.loading = false;
        state.cart = action.payload;
        if (action.payload) {
          saveCartToLocalStorage(action.payload);
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Ошибка при получении корзины';
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartProduct>) => {
        if (state.cart) {
          const existingProduct = state.cart.products.find(p => p.productId === action.payload.productId);
          if (existingProduct) {
            existingProduct.quantity += action.payload.quantity;
          } else {
            state.cart.products.push(action.payload);
          }
          saveCartToLocalStorage(state.cart);
        }
      })
      .addCase(updateCartProduct.fulfilled, (state, action: PayloadAction<CartProduct>) => {
        if (state.cart) {
          const index = state.cart.products.findIndex(
            (product) => product.id === action.payload.id,
          );
          if (index !== -1) {
            state.cart.products[index] = action.payload;
            saveCartToLocalStorage(state.cart);
          }
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<number>) => {
        if (state.cart) {
          state.cart.products = state.cart.products.filter(
            (product) => product.id !== action.payload,
          );
          saveCartToLocalStorage(state.cart);
        }
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = null;
        localStorage.removeItem('cart');
      });
  },
});

export const { addToLocalCart, removeFromLocalCart, updateLocalCartProduct, clearLocalCart, syncCartWithLocal } = cartSlice.actions;
export default cartSlice.reducer;
