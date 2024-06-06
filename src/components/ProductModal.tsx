import type React from "react"
import type { Product, CartProduct } from "@app/types"
import useAddToCart from "@app/hooks/useAddToCart"
import "@styles/Modals.css"

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  const { addProductToCart } = useAddToCart()

  const handleAddToCart = () => {
    const cartProduct: Omit<CartProduct, "id"> = {
      cartId: -1, // Placeholder, actual cartId logic will be handled in the hook
      productId: product.id,
      quantity: 1,
      price: product.price
    }
    addProductToCart(cartProduct)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{product.title}</h2>
        <img src={product.imageUrl} alt={product.title} className="product-image-modal" />
        <p>Категория: {product.category}</p>
        <p>Цена: {product.price} руб.</p>
        <button onClick={handleAddToCart}>Добавить в корзину</button>
      </div>
    </div>
  )
}

export default ProductModal
