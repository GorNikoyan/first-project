import React from 'react';
import { Routes, Route } from 'react-router';
import Wrapper from '../../pages/Wrapper/Wrapper';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import {useSelector} from "react-redux";
import {selectregisterData} from "../../store/slices/registrationData/registrationSlice";
import AdminPage from '../../pages/AdminPage/AdminPage';
import AdminWrapper from '../../pages/Wrapper/AdminWrapper';
import ProductsPageAdmin from '../../pages/ProductsAdmin/ProductsPageAdmin';
import NotFound from '../../pages/NotFound/NotFound';
import ProductsPage from '../../pages/ProductsPage/ProductsPage';
import HomePage from '../../pages/HomePage/HomePage';
// import Cart from '../../pages/Cart/Cart';
const AppRouter = () => {

    const {isAdminAuth,usersData} = useSelector(selectregisterData)
    let isAdminAuthLocalStorage = JSON.parse(localStorage.getItem("isAuthAdmin"));
    
    return (
        <div>
            <Routes>
                <Route path='homePage/' element={<Wrapper />}>
                    <Route index element={<HomePage />}/>
                    <Route path='products' element={<ProductsPage />}/>
                    {/* <Route path='cart' element={<Cart />}/> */}
                </Route>
                <Route path={'/'} element={<RegisterPage/>} />
                <Route path={'/LoginPage'} element={<LoginPage/>} />
                {
                    (isAdminAuthLocalStorage || isAdminAuth) &&
                    <Route path="adminPage/" element={<AdminWrapper/>} >
                        <Route index element={<AdminPage/>} />
                        {/* <Route path="adminPage" element={<AdminPage/>} /> */}
                        <Route path="products" element={<ProductsPageAdmin/>} />
                    </Route>
                
                }
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </div>
    );
};

export default AppRouter;