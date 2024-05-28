
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import type React from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "@components/Header";
import Footer from "@components/Footer";
import Home from "@pages/Home";
import Products from "@pages/Products";
import Cart from "@pages/Cart";
import Profile from "@pages/Profile";
import AdminUsers from "@pages/AdminUsers";
import AdminProducts from "@pages/AdminProducts";
import OrdersPage from "@pages/Orders";
import HamamyPage from "@pages/HamamyPage"; // Импортируем страницу Хамамы
import { useAppDispatch, useAppSelector } from "@app/hooks/hooks";
import { fetchCurrentUser } from "@app/slices/authSlice"; bal_ser
import ErrorPage from "@pages/ErrorPage";
import  BackgroundImage from '@components/BackgroundImage';

import BackgroundImage from '@components/BackgroundImage';
 development
import "@styles/App.css";
import ErrorPage from "@pages/ErrorPage"

const App: React.FC = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <div className="app">
      <Header />
      <BackgroundImage />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<OrdersPage />} />
bal_ser
          <Route path="/hamamy" element={<HamamyPage />} /> {/* Маршрут для Хамамы */}
          <Route path="*" element={<ErrorPage />} />
development
          {user && user.role === "ADMIN" && (
            <>
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/products" element={<AdminProducts />} />
            </>
          )}
          { <Route path="*" element={<ErrorPage />} /> }
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
