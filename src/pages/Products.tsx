import type React from "react"
import { useEffect, useState } from "react"
import { fetchProducts } from "@app/slices/productsSlice"
import { fetchCart } from "@app/slices/cartSlice"
import type { Product, CartProduct } from "@app/types"
import { useAppDispatch, useAppSelector } from "@app/hooks/hooks"
import useAddToCart from "@app/hooks/useAddToCart"
import "@styles/Products.css"

const Products: React.FC = () => {
  const dispatch = useAppDispatch()
  const { products, loading, error } = useAppSelector(state => state.products)
  const { user, isAuthenticated } = useAppSelector(state => state.auth)
  const { addProductToCart } = useAddToCart()

  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    title: "",
    category: "",
    price: 0,
    imageUrl: ""
  })

  useEffect(() => {
    dispatch(fetchProducts())
    if (isAuthenticated && user?.id) {
      dispatch(fetchCart())
    }
  }, [dispatch, isAuthenticated, user])

  const handleAddToCart = (product: Product) => {
    const cartProduct: Omit<CartProduct, "id"> = {
      cartId: user?.id || -1,
      productId: product.id,
      quantity: 1,
      price: product.price
    }
    addProductToCart(cartProduct)
  }

  return (
    <div>
      <h1>Продукты</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.title} className="product-image" />
            <div className="product-details">
              <span className="product-title">{product.title}</span>
              <br />
              <span className="product-category">Категория: {product.category}</span>
              <br />
              <span className="product-price">Цена: {product.price} руб.</span>
              <br />
              <button onClick={(e) => {
                e.stopPropagation()
                handleAddToCart(product)
              }}>Добавить в корзину
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
