import type React from 'react';
import { addToCart, addToLocalCart } from '@app/slices/cartSlice';
import type { RootState, AppDispatch } from '@app/store';
import type { Product, CartProduct } from '@app/types';
import '@styles/Modals.css';
import { useAppDispatch, useAppSelector } from "@app/hooks/hooks"

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  const dispatch: AppDispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { cart } = useAppSelector((state: RootState) => state.cart);

  const handleAddToCart = () => {
    if (user && user.id) {
      const existingProduct = cart?.products.find(p => p.productId === product.id);
      if (existingProduct) {
        dispatch(addToCart({ cartId: user.id, productId: product.id, quantity: existingProduct.quantity + 1, price: product.price }));
      } else {
        const cartProduct: Omit<CartProduct, 'id'> = {
          cartId: user.id,
          productId: product.id,
          quantity: 1,
          price: product.price
        };
        dispatch(addToCart(cartProduct));
      }
      onClose();
    } else {
      const existingProduct = cart?.products.find(p => p.productId === product.id);
      if (existingProduct) {
        dispatch(addToLocalCart({ cartId: -1, productId: product.id, quantity: existingProduct.quantity + 1, price: product.price }));
      } else {
        const localCartProduct: Omit<CartProduct, 'id'> = {
          cartId: -1,
          productId: product.id,
          quantity: 1,
          price: product.price
        };
        dispatch(addToLocalCart(localCartProduct));
      }
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