import { addToCart, addToLocalCart } from "@app/slices/cartSlice"
import type { AppDispatch, RootState } from "@app/store"
import type { CartProduct } from "@app/types"
import { useAppDispatch, useAppSelector } from "@app/hooks/hooks"

const useAddToCart = () => {
  const dispatch: AppDispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const { cart } = useAppSelector((state: RootState) => state.cart)

  const addProductToCart = (product: Omit<CartProduct, "id">) => {
    if (isAuthenticated && user) {
      dispatch(addToCart(product))
    } else {
      const existingProduct = cart?.products.find(p => p.productId === product.productId)
      if (existingProduct) {
        dispatch(addToLocalCart({ ...product, quantity: existingProduct.quantity + 1 }))
      } else {
        dispatch(addToLocalCart(product))
      }
    }
  }

  return { addProductToCart }
}

export default useAddToCart
