import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {getCurrentUser, selectregisterData } from '../../../store/slices/registrationData/registrationSlice';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import './HeaderNavigation.css';
const HeaderNavigationAdmin = () => {
    const dispatch = useDispatch()
    const { currentUser, isAdminAuth} = useSelector(selectregisterData)
    let currentUserLocalStorage = JSON.parse(localStorage.getItem("currentUser"));
    let isAdminAuthLocalStorage = JSON.parse(localStorage.getItem("isAuthAdmin"));

    const [isActive, setIsActive] = useState(false);
    const navigate =  useNavigate()
    const logOut = () => {
        navigate('/LoginPage')
        dispatch(getCurrentUser(null))
        localStorage.clear()
        console.log('ok');
    }
    return (
        <div className='headerNav' style={{marginBottom:'20px'}}>
            <nav>
                <span>
                    <ul id='navmenu'>
                        <li>
                            <NavLink to="/homePage">Home Page</NavLink>
                        </li>
                        <li>
                           {isAdminAuthLocalStorage && <NavLink to="/adminPage">Users</NavLink>} 
                        </li>
                        <li>
                            <NavLink to="products">Products</NavLink> 
                        </li>
                    </ul>
                </span>
                <span id='adminInfo' style={{display:'flex',gap:'10px', alignItems:'center'}}>
                    <div className="dropdown">
                        <FontAwesomeIcon icon={faUser} 
                            className='icon fa-2xl button'
                            onClick={() => {
                            setIsActive(!isActive)
                            }}
                        />
                        <ul id="list-items" style={isActive ? ({display:'block'}):({display:'none'})}>
                            <li> {currentUserLocalStorage.name} </li>
                            <li> {currentUserLocalStorage.lastname} </li>
                            <li> {currentUserLocalStorage.login}</li>
                            <li> {currentUserLocalStorage.email} </li>
                            <li><a onClick={() => {
                                logOut()
                            }}>Log out</a></li>
                        </ul>
                    </div>
                    <span style={{color:'blue', fontSize:'18px'}}>{currentUserLocalStorage.login}</span>
                </span>
            </nav>
        </div>
    );
};

export default HeaderNavigationAdmin;