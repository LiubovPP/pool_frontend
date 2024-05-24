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
import OrdersPage from '@pages/Orders';
import '@styles/App.css';
import { useAppDispatch } from '@app/hooks';
import { fetchCurrentUser } from '@app/slices/authSlice';
import ErrorPage from '@pages/ErrorPage';

const App: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
<<<<<<< sergik_dev
          <Route path="*" element={<ErrorPage/>} />
=======
          <Route path="/orders" element={<OrdersPage />} />
>>>>>>> development
          {user && user.role === 'ADMIN' && (
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
