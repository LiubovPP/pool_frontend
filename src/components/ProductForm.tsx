import React, { useState, useEffect } from "react"
import type { Product } from "@app/types"

interface ProductFormProps {
  product?: Omit<Product, "id">;
  onSubmit: (product: Omit<Product, "id">) => void;
  onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [formState, setFormState] = useState<Omit<Product, "id">>({
    title: product?.title || "",
    category: product?.category || "",
    price: product?.price || 0,
    imageUrl: product?.imageUrl || ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = () => {
    onSubmit(formState)
  }

  return (
    <div>
      <input
        type="text"
        name="title"
        value={formState.title}
        onChange={handleChange}
        placeholder="Название"
      />
      <input
        type="text"
        name="category"
        value={formState.category}
        onChange={handleChange}
        placeholder="Категория"
      />
      <input
        type="number"
        name="price"
        value={formState.price}
        onChange={handleChange}
        placeholder="Цена"
      />
      <input
        type="text"
        name="imageUrl"
        value={formState.imageUrl}
        onChange={handleChange}
        placeholder="URL изображения"
      />
      <button onClick={handleSubmit}>Сохранить</button>
      {onCancel && <button onClick={onCancel}>Отмена</button>}
    </div>
  )
}

export default ProductForm
