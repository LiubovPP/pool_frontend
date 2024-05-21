import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Cart, CartProduct } from '@app/types';

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId: number) => {
    const response = await axios.get(`/api/cart/${userId}`);
    return response.data;
  },
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (product: Omit<CartProduct, 'id'>) => {
    const response = await axios.post(`/api/cart/${product.cartId}/cart-products`, product);
    return response.data;
  },
);

export const updateCartProduct = createAsyncThunk(
  'cart/updateCartProduct',
  async (cartProduct: CartProduct) => {
    const { cartId, id } = cartProduct;
    const response = await axios.put(`/api/cart/${cartId}/cart-products/${id}`, cartProduct);
    return response.data;
  },
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (params: { cartId: number; cartProductId: number }) => {
    const { cartId, cartProductId } = params;
    await axios.delete(`/api/cart/${cartId}/cart-products/${cartProductId}`);
    return cartProductId;
  },
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (cartId: number) => {
    await axios.delete(`/api/cart/${cartId}`);
    return cartId;
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cart';
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartProduct>) => {
        if (state.cart) {
          state.cart.products.push(action.payload);
        }
      })
      .addCase(updateCartProduct.fulfilled, (state, action: PayloadAction<CartProduct>) => {
        if (state.cart) {
          const index = state.cart.products.findIndex(
            (product) => product.id === action.payload.id,
          );
          if (index !== -1) {
            state.cart.products[index] = action.payload;
          }
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<number>) => {
        if (state.cart) {
          state.cart.products = state.cart.products.filter(
            (product) => product.id !== action.payload,
          );
        }
      })
      .addCase(clearCart.fulfilled, (state) => {
        if (state.cart) {
          state.cart.products = [];
        }
      });
  },
});

export default cartSlice.reducer;
