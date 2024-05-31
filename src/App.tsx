import React, { useEffect } from "react";
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
import HamamPage from "@pages/HamamPage"; // Добавить импорт HamamPage
import { useAppDispatch, useAppSelector } from "@app/hooks/hooks";
import { fetchCurrentUser } from "@app/slices/authSlice";
import BackgroundImage from '@components/BackgroundImage';
import "@styles/App.css";
import ErrorPage from "@pages/ErrorPage";
import Maintanance from "@pages/Maintanance";
import Composite from "@pages/Composite";
import Frame from "@pages/Frame";
import Concrete from "@pages/Concrete";
import Adjustable from "@pages/Adjustable";

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
                    <Route path="/hamamy" element={<HamamPage />} /> {/* Добавить маршрут для HamamPage */}
                    <Route path="/maintanance" element={<Maintanance />} />
                    <Route path="/composite" element={<Composite />} />
                    <Route path="/frame" element={<Frame />} />
                    <Route path="/concrete" element={<Concrete />} />
                    <Route path="/adjustable" element={<Adjustable />} />
                    <Route path="*" element={<ErrorPage />} />
                    {user && user.role === "ADMIN" && (
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
