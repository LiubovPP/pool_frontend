import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "@app/hooks/hooks"
import { logoutUser, fetchCurrentUser } from "@app/slices/authSlice"
import { clearLocalCart, syncCartWithLocal, fetchCart } from "@app/slices/cartSlice"
import LoginModal from "@components/LoginModal"
import RegisterModal from "@components/RegisterModal"
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"
import logo from "@assets/logo.png"
import "@styles/Header.css"
import Dropdown from "@components/Dropdown"

const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { cart } = useAppSelector((state) => state.cart)
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false)

  const totalItems = cart?.products.reduce((total, item) => total + item.quantity, 0) || 0

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      dispatch(clearLocalCart())
      navigate("/")
    } catch (error) {
      console.error("Ошибка выхода", error)
    }
  }

  const handleLogin = () => {
    setLoginModalOpen(true)
  }

  const handleSyncCart = useCallback(async () => {
    if (isAuthenticated) {
      const localCart = JSON.parse(localStorage.getItem("cart") || "null")
      if (localCart) {
        dispatch(syncCartWithLocal(localCart))
      }
      try {
        await dispatch(fetchCurrentUser()).unwrap()
        if (user) {
          await dispatch(fetchCart()).unwrap()
        }
      } catch (error) {
        console.error("Ошибка при синхронизации корзины", error)
      }
    }
  }, [isAuthenticated, dispatch])

  useEffect(() => {
    handleSyncCart()
  }, [handleSyncCart])

  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">
          <Link to="/"><img src={logo} alt="Logo" /></Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link to="/pools/"></Link>
              <Dropdown />
            </li>
            <li>
              <Link to="/hamamy/">Хамамы</Link>
            </li>
            <li>
              <Link to="/sauny/">Сауны</Link>
            </li>
            <li>
              <Link to="/gallereya/">Галерея</Link>
            </li>
            <li>
              <Link to="/kontakty/">Контакты</Link>
            </li>
            <li>
              <Link to="/products">Продукты</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/orders">Мои заказы</Link>
                </li>
                <li>
                  <Link to="/profile"><FaUserCircle size={24} /></Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="nav-button">Выйти</button>
                </li>
              </>
            ) : (
              <li>
                <button onClick={handleLogin} className="nav-button">Войти</button>
              </li>
            )}
            <li className="cart-icon">
              <Link to="/cart">
                <FaShoppingCart size={24} />
                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onRegister={() => {
          setLoginModalOpen(false)
          setRegisterModalOpen(true)
        }}
      />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} />
    </header>
  )
}

export default Header
