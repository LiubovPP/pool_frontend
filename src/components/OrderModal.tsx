import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@app/store';
import { createOrder } from '@app/slices/orderSlice';
import { Cart, User, OrderProduct } from '@app/types';
import '@styles/Modals.css';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Cart | null;
  user: User | null;
  onOrderSuccess: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, cart, user, onOrderSuccess }) => {
  const dispatch: AppDispatch = useDispatch();
  const [summa, setSumma] = useState<number>(0);

  useEffect(() => {
    if (cart) {
      const totalSum = cart.products.reduce((total, item) => total + item.quantity * item.price, 0);
      setSumma(totalSum);
    }
  }, [cart]);

  const handleCreateOrder = async () => {
    if (cart && user) {
      const orderProducts: OrderProduct[] = cart.products.map(item => ({
        id: 0,
        orderId: 0,
        productId: item.productId,
        quantity: item.quantity
      }));

      await dispatch(createOrder({
        userId: user.id,
        summa: summa,
        itemsCount: cart.products.reduce((total, item) => total + item.quantity, 0),
        date: new Date().toISOString(),
        products: orderProducts
      })).unwrap();
      onOrderSuccess();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Оформление заказа</h2>
        <p>Сумма: {summa} руб.</p>
        <p>Количество товаров: {cart?.products.reduce((total, item) => total + item.quantity, 0)}</p>
        <button onClick={handleCreateOrder}>Создать заказ</button>
        <button onClick={onClose}>Отмена</button>
      </div>
    </div>
  );
};

export default OrderModal;
