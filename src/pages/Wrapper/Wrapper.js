import React from 'react';
import { Link, Navlink, Outlet } from 'react-router-dom';
import HeaderNavigation from './HeaderNavigation/HeaderNavigation';
const Wrapper = () => {
    return (
        <div style={{maxWidth:'95%', margin:'0 auto'}}>
            <HeaderNavigation/>
            <Outlet/>
        </div>
    );
};

export default Wrapper;