import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Home from '@pages/Home';
import Products from '@pages/Products';
import Cart from '@pages/Cart';
import Profile from '@pages/Profile';
import AdminUsers from '@pages/AdminUsers';
import AdminProducts from '@pages/AdminProducts';
import '@styles/App.css';
import { useAppDispatch } from '@app/hooks';
import { fetchCurrentUser } from '@app/slices/authSlice';
import backgroundImage from './assets/head-d.png';
import BackgroundImage from '@components/BackgroundImage ';

const App: React.FC = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <div className="app">
      <Header />
      <BackgroundImage/>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          {user?.role === 'ADMIN' && (
            <>
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/products" element={<AdminProducts />} />
            </>
          )}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
