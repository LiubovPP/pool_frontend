import type React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { fetchProducts, addProduct, deleteProduct } from '@app/slices/productsSlice';
import { addToCart, addToLocalCart, fetchCart } from '@app/slices/cartSlice';
import type { Product, CartProduct } from '@app/types';
import ProductModal from '@components/ProductModal';
import '@styles/Products.css';

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(state => state.products);
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  const { cart } = useAppSelector(state => state.cart);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ title: '', category: '', price: 0, imageUrl: '' });

  useEffect(() => {
    dispatch(fetchProducts());
    if (isAuthenticated && user?.id) {
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, isAuthenticated, user]);

  const handleAddToCart = (product: Product) => {
    if (isAuthenticated && user?.id) {
      const cartProduct: Omit<CartProduct, 'id'> = {
        cartId: user.id,
        productId: product.id,
        quantity: 1,
        price: product.price
      };
      dispatch(addToCart(cartProduct));
    } else {
      const localCartProduct: Omit<CartProduct, 'id'> = {
        cartId: -1,
        productId: product.id,
        quantity: 1,
        price: product.price
      };
      dispatch(addToLocalCart(localCartProduct));
    }
  };

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleAddProduct = () => {
    dispatch(addProduct(newProduct));
    setNewProduct({ title: '', category: '', price: 0, imageUrl: '' });
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Продукты</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
            <img src={product.imageUrl} alt={product.title} className="product-image" />
            <div className="product-details">
              <span className="product-title">{product.title}</span>
              <span className="product-price">{product.price} руб.</span>
              <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>Добавить в корзину</button>
              {user?.role === 'ADMIN' && (
                <button onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.id); }}>Удалить продукт</button>
              )}
            </div>
          </div>
        ))}
      </div>
      {user?.role === 'ADMIN' && (
        <div className="add-product-form">
          <h2>Добавить продукт</h2>
          <input
            type="text"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            placeholder="Название"
          />
          <input
            type="text"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            placeholder="Описание"
          />
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: +e.target.value })}
            placeholder="Цена"
          />
          <input
            type="text"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
            placeholder="URL изображения"
          />
          <button onClick={handleAddProduct}>Добавить продукт</button>
        </div>
      )}
      {selectedProduct && (
        <ProductModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}
      {cart && (
        <div className="cart-summary">
          <h2>Корзина</h2>
          <ul>
            {cart.products.map((item) => (
              <li key={item.productId}>
                {products.find(product => product.id === item.productId)?.title} - Количество: {item.quantity}
              </li>
            ))}
          </ul>
          <div>
            Всего товаров в корзине: {cart.products.reduce((total, item) => total + item.quantity, 0)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
