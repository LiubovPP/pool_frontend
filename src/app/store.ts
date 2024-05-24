import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@app/slices/authSlice';
import cartReducer from '@app/slices/cartSlice';
import productsReducer from '@app/slices/productsSlice';
import usersReducer from '@app/slices/usersSlice';
import ordersReducer from '@app/slices/orderSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    users: usersReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
