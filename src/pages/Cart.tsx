import type React from "react"
import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "@app/hooks/hooks" // Используем типизированные хуки
import {
  fetchCart,
  removeFromCart,
  updateCartProduct,
  updateLocalCartProduct,
  removeFromLocalCart
} from "@app/slices/cartSlice"
import type { CartProduct } from "@app/types"
import "@styles/Cart.css"
import LoginModal from "@components/LoginModal"
import OrderModal from "@components/OrderModal"

const Cart: React.FC = () => {
  const dispatch = useAppDispatch()
  const { cart, loading, error } = useAppSelector((state) => state.cart)
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)
  const [isOrderModalOpen, setOrderModalOpen] = useState(false)

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchCart(user.id))
    }
  }, [dispatch, user])

  const handleRemove = (cartProductId: number) => {
    if (cart) {
      if (isAuthenticated) {
        dispatch(removeFromCart(cartProductId))
      } else {
        dispatch(removeFromLocalCart(cartProductId))
      }
    }
  }

  const handleUpdateQuantity = (product: CartProduct, quantity: number) => {
    if (cart) {
      if (isAuthenticated) {
        dispatch(updateCartProduct({ ...product, quantity }))
      } else {
        dispatch(updateLocalCartProduct({ ...product, quantity }))
      }
    }
  }

  const handleOrder = async () => {
    if (!isAuthenticated) {
      setLoginModalOpen(true)
      return
    }
    setOrderModalOpen(true)
  }

  if (loading) return <p>Загрузка...</p>

  let errorMessage: string | null = null
  if (error) {
    errorMessage = typeof error === "string" ? error : "Произошла ошибка"
  }

  return (
    <div>
      <h1>Корзина</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
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
          setLoginModalOpen(false)
        }}
      />
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        cart={cart}
        user={user}
        onOrderSuccess={() => {
          setOrderModalOpen(false)
          // добавить обработчик успешного заказа
        }}
      />
    </div>
  )
}

export default Cart
