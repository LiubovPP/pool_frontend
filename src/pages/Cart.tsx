import type React from "react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@app/hooks/hooks"
import {
  fetchCart,
  removeFromCart,
  addToCart,
  removeFromLocalCart,
  updateLocalCartProduct
} from "@app/slices/cartSlice"
import LoginModal from "@components/LoginModal"
import OrderModal from "@components/OrderModal"
import type { CartProduct } from "@app/types"
import "@styles/Cart.css"

const Cart: React.FC = () => {
  const dispatch = useAppDispatch()
  const { cart, loading, error } = useAppSelector((state) => state.cart)
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)
  const [isOrderModalOpen, setOrderModalOpen] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart())
    }
  }, [dispatch, isAuthenticated])

  const handleRemove = (productId: number) => {
    if (cart) {
      if (isAuthenticated) {
        dispatch(removeFromCart(productId))
          .unwrap()
          .catch((error) => {
            console.error("Ошибка при удалении товара из корзины", error)
          })
      } else {
        dispatch(removeFromLocalCart(productId))
      }
    }
  }

  const handleUpdateQuantity = (product: CartProduct, quantity: number) => {
    if (cart) {
      if (quantity <= 0) {
        handleRemove(product.productId)
      } else {
        if (isAuthenticated) {
          const updatedProduct = {
            productId: product.productId,
            quantity: quantity,
            cartId: product.cartId,
            price: product.price
          }

          dispatch(addToCart(updatedProduct))
            .unwrap()
            .catch((error) => {
              console.error("Ошибка при обновлении количества товара в корзине", error)
            })
        } else {
          dispatch(updateLocalCartProduct({ ...product, quantity }))
        }
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
          <li key={item.productId}>
            <span>
              Product ID: {item.productId} - Количество: {item.quantity}
            </span>
            <button onClick={() => handleRemove(item.productId)}>Удалить</button>
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
