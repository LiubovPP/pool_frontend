import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@app/store';
import { fetchCart, addToCart, removeFromCart, updateCartProduct, clearCart } from '@app/slices/cartSlice';
import { CartProduct } from '@app/types';
import axios from 'axios';
import '@styles/Cart.css';
import LoginModal from '@components/LoginModal';

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { cart, loading, error } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, user]);

  const handleRemove = (cartProductId: number) => {
    if (cart) {
      dispatch(removeFromCart({ cartId: cart.id, cartProductId }));
    }
  };

  const handleUpdateQuantity = (product: CartProduct, quantity: number) => {
    if (cart) {
      dispatch(updateCartProduct({ ...product, quantity }));
    }
  };

  const handleOrder = async () => {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return;
    }

    if (user && cart) {
      try {
        await axios.post('/api/orders', {
          userId: user.id,
          products: cart.products,
        });
        dispatch(clearCart(cart.id));
      } catch (error) {
        console.error('Ошибка заказа', error);
      }
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Корзина</h1>
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
        <button onClick={handleOrder}>Оформить заказ</button>
      )}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onRegister={() => {
          setLoginModalOpen(false);
          // можно добавить открытие модального окна регистрации
        }}
      />
    </div>
  );
};

export default Cart;
