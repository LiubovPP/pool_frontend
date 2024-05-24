import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '@app/store';
import { logoutUser } from '@app/slices/authSlice';
import LoginModal from '@components/LoginModal';
import RegisterModal from '@components/RegisterModal';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '@assets/logo.png';
import '@styles/Header.css';

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  console.log('Header User:', user);

  const totalItems = cart?.products.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Ошибка выхода', error);
    }
  };

  const handleLogin = () => {
    setLoginModalOpen(true);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">
          <a href="/"><img src={logo} alt="Logo" /></a>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link to="/pools/">Бассейны</Link>
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
                  <Link to="/profile">Профиль</Link>
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
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} onRegister={() => { setLoginModalOpen(false); setRegisterModalOpen(true); }} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} />
    </header>
  );
};

export default Header;
