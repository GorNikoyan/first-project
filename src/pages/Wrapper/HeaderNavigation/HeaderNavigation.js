import React, { useEffect, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping, faTrash, faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {getCurrentUser, selectregisterData } from '../../../store/slices/registrationData/registrationSlice';
import { selectProductsData } from '../../../store/slices/productsData/productsSlice';
import { deleteFetchCartProduct, editFetchCartProductCount, getFetchCart } from '../../../store/slices/cartData/cartDataApi';
import { selectCartData } from '../../../store/slices/cartData/cartSlice';
import './HeaderNavigation.css';
import { editFetchProduct } from '../../../store/slices/productsData/productsDataApi';
const HeaderNavigation = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFetchCart())
    }, [])
    const { currentUser, isAdminAuth} = useSelector(selectregisterData)
    
    
    // console.log(currentUserLocalStorage);
    const {products} = useSelector(selectProductsData)
    const {cart} = useSelector(selectCartData)
    const [isActive, setIsActive] = useState(false);
    const [show, setShow] = useState(false)
    const navigate =  useNavigate()
    const logOut = () => {
        navigate('/LoginPage')
        dispatch(getCurrentUser(null))
        localStorage.clear()
        console.log('logOut');
    }
    let currentUserLocalStorage = JSON.parse(localStorage.getItem("currentUser"));
    let isAdminAuthLocalStorage = JSON.parse(localStorage.getItem("isAuthAdmin"));
    const currentUsersCart = cart.filter(c => c.userId == currentUserLocalStorage.id);
    // console.log(currentUsersCart);

    // localStorage.removeItem("currentUsersCart");
    // localStorage.setItem("currentUsersCart", JSON.stringify(currentUsersCart));
   
    const handlerDelete = (product) => {
        const editingProduct = products.find(prod => prod.id === product.productId)
        // console.log(editingProduct);
        dispatch(deleteFetchCartProduct(product.id))
        dispatch(editFetchProduct({
            id:editingProduct.id,
            title:editingProduct.title,
            price:editingProduct.price,
            description:editingProduct.description,
            category:editingProduct.category,
            totalAmount:editingProduct.totalAmount + product.count,
            rating:editingProduct.rating,
            image: editingProduct.image
        }))
    }
    const handlerCountPlus = (product) => {
        // console.log(product);
        const editingProduct = products.find(prod => prod.id === product.productId)
        // console.log(editingProduct);
        if(editingProduct.totalAmount > 0){
            dispatch(editFetchCartProductCount({
                ...product,
                count: product.count + 1
            }))
        }else{
            alert('Out of stock')
        }
    }
    const handlerCountMinus = (product) => {
        const editingProduct = products.find(prod => prod.id === product.productId)
        // console.log(editingProduct);
        if(product.count > 1){
            dispatch(editFetchCartProductCount({
                ...product,
                count: product.count - 1
            }))
        }
    }
    const handlerBuye = (product) => {
        const editingProduct = products.find(prod => prod.id === product.productId)
        // console.log(product);
        if(editingProduct.totalAmount >= product.count){
            dispatch(editFetchProduct({
                id: editingProduct.id,
                title:editingProduct.title,
                price:editingProduct.price,
                description:editingProduct.description,
                category:editingProduct.category,
                totalAmount: Number(editingProduct.totalAmount) - Number(product.count),
                rating:editingProduct.rating,
                image: editingProduct.image
            }))
            alert("Congrats!!!")
        }else{
            alert("Sorry you can only buy " +  editingProduct.totalAmount + " pieces of this product")
        }
    }
    const getTotalCartAmount = () => {
        return currentUsersCart.map(cart => {
            return Number(cart.price) * Number(cart.count);
            }).reduce(function summarize(sum, number) {
            return  sum + number;
          }, 0);
    }
    const CurrentUserTotalCartAmount = getTotalCartAmount()
    // console.log(CurrentUserTotalCartAmount);
    return (
        <div className='headerNav' style={{marginBottom:'20px'}}>
            <nav>
                <span>
                    <ul id='navmenu'>
                        <li>
                            <NavLink to="/homePage">Home Page</NavLink>
                        </li>
                        <li>
                           {isAdminAuthLocalStorage == true && <NavLink to="/adminPage">Admin</NavLink>} 
                        </li>
                        <li>
                            <NavLink to="products">Products</NavLink> 
                        </li>
                        
                    </ul>
                </span>
                <span id='userInfo' style={{display:'flex',gap:'10px', alignItems:'center'}}>
                    <span style={{color:'blue', fontSize:'18px'}}>{currentUserLocalStorage.login}</span>
                    
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
                    <div style={{position:'relative'}}>
                        <FontAwesomeIcon icon={faCartShopping} className='cart' size='2xl' 
                        onClick={() => {
                            setShow(!show)
                        }}
                        />
                        <span style={{position:"absolute",left:'15px',top:'-2px', color:'red'}}>{currentUsersCart.length}</span>
                    </div>

                </span>
            </nav>
                <div id='myModal'  className={!show ? '' : 'show-modal'} style={ !show ? {display:'none'} : {display: 'inline'}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                       <div><h3>Cart - total amount | <span style={{color:'red'}}>{CurrentUserTotalCartAmount}$</span></h3></div>
                        <button style={{backgroundColor:'inherit',border:'none',color:'red', fontSize:'25px'}} 
                            onClick={() => {
                                setShow(!show)
                            }}
                            >
                                <FontAwesomeIcon icon={faXmark} size='2xl'/>
                        </button> 
                    </div>
                    <table>
                        <tbody>
                            {currentUsersCart.length > 0 ? currentUsersCart.map(product => (
                                <tr key={product.id}>
                                    <td style={{maxWidth:'250px'}}>{product.title}</td>
                                    <td style={{fontSize:"16px"}}>{product.count * product.price}$</td>
                                    <td>
                                        <img src={product.image} alt={product.title}/> 
                                    </td>
                                    <td>
                                        <div style={{textAlign:"center"}}>
                                            {product.count}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{display:'flex',gap:'5px'}}>
                                            <button  onClick={(e) => {
                                                e.preventDefault()
                                                handlerCountMinus(product)
                                            }}>
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                            <button onClick={() => {
                                                handlerCountPlus(product)
                                            }}>
                                            <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                            <button style={{backgroundColor:'inherit',border:'none',color:'red'}} 
                                            onClick={() => {
                                                handlerDelete(product)
                                            }}
                                            >
                                                <FontAwesomeIcon icon={faTrash}  size='2xl'/>
                                            </button>
                                            <button 
                                                style={{backgroundColor:'white',border:'2px solid green',color:'green',borderRadius:'10px'}} 
                                                onClick={() => {
                                                    handlerBuye(product)
                                                }}
                                            >
                                                Buy
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                            : 
                                <tr>
                                    <td><h2>Cart is empty</h2></td>
                                </tr>
                            }     
                        </tbody>              
                    </table>
                    
                </div>
        </div>
    );
};

export default HeaderNavigation;