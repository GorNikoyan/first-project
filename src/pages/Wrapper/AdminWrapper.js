import React from 'react';
import { Link, Navlink, Outlet } from 'react-router-dom';
import HeaderNavigationAdmin from './HeaderNavigation/HeaderNavigationAdmin';

const AdminWrapper = () => {
    return (
        <div>
            <HeaderNavigationAdmin />
            <Outlet/>
        </div>
    );
};

export default AdminWrapper;