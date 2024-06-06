import type React from "react";
import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@app/hooks/hooks"
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "@app/slices/productsSlice"
import type { CartProduct, Product } from "@app/types"
import ProductForm from "@components/ProductForm"
import "@styles/Products.css"
import useAddToCart from "@app/hooks/useAddToCart"

const Products: React.FC = () => {
  const dispatch = useAppDispatch()
  const { products, loading, error } = useAppSelector((state) => state.products)
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const { addProductToCart } = useAddToCart()

  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleAddProduct = (product: Omit<Product, "id">) => {
    dispatch(addProduct(product))
    setIsAddingProduct(false)
  }

  const handleUpdateProduct = (product: Omit<Product, "id">) => {
    if (editingProduct) {
      dispatch(updateProduct({ ...editingProduct, ...product }))
      setEditingProduct(null)
    }
  }

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id))
  }

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
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {editingProduct && editingProduct.id === product.id ? (
              <ProductForm
                product={product}
                onSubmit={handleUpdateProduct}
                onCancel={() => setEditingProduct(null)}
              />
            ) : (
              <div>
                {/*<img src={product.imageUrl} alt={product.title} className="product-image" />*/}
                <div className="product-details">
                  <br />
                  <span className="product-title">{product.title}</span>
                  <br />
                  <span className="product-category">Категория: {product.category}</span>
                  <br />
                  <span className="product-price">Цена: {product.price} руб.</span>
                  <br />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(product)
                    }}
                  >
                    Добавить в корзину
                  </button>
                  <br />
                  {user?.role === "ADMIN" && (
                    <>
                      <br />
                      <button onClick={() => setEditingProduct(product)}>Редактировать</button>
                      <button onClick={() => handleDeleteProduct(product.id)}>Удалить</button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {user?.role === "ADMIN" && (
        <div className="add-product-form">
          <h2>Добавить продукт</h2>
          {isAddingProduct ? (
            <ProductForm onSubmit={handleAddProduct} onCancel={() => setIsAddingProduct(false)} />
          ) : (
            <button onClick={() => setIsAddingProduct(true)}>Добавить продукт</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Products
