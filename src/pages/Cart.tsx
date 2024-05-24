import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@app/store';
import { fetchCart, addToCart, removeFromCart, updateCartProduct, clearCart, updateLocalCartProduct, removeFromLocalCart } from '@app/slices/cartSlice';
import { CartProduct } from '@app/types';
import '@styles/Cart.css';
import LoginModal from '@components/LoginModal';
import OrderModal from '@components/OrderModal';

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { cart, loading, error } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, user]);

  const handleRemove = (cartProductId: number) => {
    if (cart) {
      if (isAuthenticated) {
        dispatch(removeFromCart(cartProductId));
      } else {
        dispatch(removeFromLocalCart(cartProductId));
      }
    }
  };

  const handleUpdateQuantity = (product: CartProduct, quantity: number) => {
    if (cart) {
      if (isAuthenticated) {
        dispatch(updateCartProduct({ ...product, quantity }));
      } else {
        dispatch(updateLocalCartProduct({ ...product, quantity }));
      }
    }
  };

  const handleOrder = async () => {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return;
    }
    setOrderModalOpen(true);
  };

  if (loading) return <p>Загрузка...</p>;

  let errorMessage: string | null = null;
  if (error) {
    errorMessage = typeof error === 'string' ? error : 'Произошла ошибка';
  }

  return (
    <div>
      <h1>Корзина</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <ul className="cart-list">
        {cart?.products.map((item) => (
          <li key={item.id}>
            <span>Product ID: {item.productId} - Количество: {item.quantity}</span>
            <button onClick={() => handleRemove(item.id)}>Удалить</button>
            <button onClick={() => handleUpdateQuantity(item, item.quantity + 1)}>+</button>
            <button onClick={() => handleUpdateQuantity(item, item.quantity - 1)}>-</button>
          </li>
        ))}
      </ul>
      {cart && cart.products.length > 0 && (
        <div>
          <button onClick={handleOrder}>Оформить заказ</button>
          <p>Общая сумма: {cart.products.reduce((total, item) => total + item.quantity * item.price, 0)} руб.</p>
        </div>
      )}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onRegister={() => {
          setLoginModalOpen(false);
        }}
      />
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        cart={cart}
        user={user}
        onOrderSuccess={() => {
          setOrderModalOpen(false);
          // добавить обработчик успешного заказа
        }}
      />
    </div>
  );
};

export default Cart;
