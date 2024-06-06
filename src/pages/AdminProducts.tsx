import type React from "react"
import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@app/hooks/hooks"
import { fetchProducts, addProduct, updateProduct } from "@app/slices/productsSlice"
import type { Product } from "@app/types"

const AdminProducts: React.FC = () => {
  const dispatch = useAppDispatch()
  const { products, loading, error } = useAppSelector((state) => state.products)
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    title: "",
    category: "",
    price: 0,
    imageUrl: ""
  })
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleAddProduct = () => {
    dispatch(addProduct(newProduct))
    setNewProduct({ title: "", category: "", price: 0, imageUrl: "" })
  }

  const handleUpdateProduct = (product: Product) => {
    dispatch(updateProduct(product))
    setEditingProduct(null)
  }

  if (loading) return <p>Загрузка...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Продукты</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {editingProduct && editingProduct.id === product.id ? (
              <div>
                <input
                  type="text"
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                />
                <input
                  type="text"
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                />
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: +e.target.value })}
                />
                <button onClick={() => handleUpdateProduct(editingProduct)}>Сохранить</button>
              </div>
            ) : (
              <div>
                {product.title} - {product.category} - {product.price} руб.
                <button onClick={() => setEditingProduct(product)}>Редактировать</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
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
    </div>
  )
}

export default AdminProducts
