import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@app/slices/cartSlice';
import { RootState, AppDispatch } from '@app/store';
import { Product, CartProduct } from '@app/types';
import '@styles/Modals.css';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleAddToCart = () => {
    if (user && user.id) {
      const cartProduct: Omit<CartProduct, 'id'> = {
        cartId: user.id,
        productId: product.id,
        quantity: 1,
      };
      dispatch(addToCart(cartProduct));
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{product.title}</h2>
        <img src={product.imageUrl} alt={product.title} className="product-image-modal" />
        <p>Описание: {product.category}</p>
        <p>Цена: {product.price} руб.</p>
        <button onClick={handleAddToCart}>Добавить в корзину</button>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default ProductModal;
