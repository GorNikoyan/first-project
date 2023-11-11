import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductsData } from '../../store/slices/productsData/productsSlice';
import { useEffect } from 'react';
import { editFetchProduct, getFetchProducts } from '../../store/slices/productsData/productsDataApi';
import { selectregisterData } from '../../store/slices/registrationData/registrationSlice';
import { getFetchCart, postFetchCart } from '../../store/slices/cartData/cartDataApi';
import { selectCartData } from '../../store/slices/cartData/cartSlice';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


import './ProductsPage.css';
const ProductsPage = () => {
    const {products} = useSelector(selectProductsData)
    const {currentUser} = useSelector(selectregisterData)
    let currentUserLocalStorage = JSON.parse(localStorage.getItem("currentUser"));
    let isAdminAuthLocalStorage = JSON.parse(localStorage.getItem("isAuthAdmin"));
    console.log(currentUserLocalStorage);
    const dispatch = useDispatch();
    const {cart} = useSelector(selectCartData)
 
    const [value, setValue] = useState(0)
    useEffect(() => {
        dispatch(getFetchProducts())
        dispatch(getFetchCart())
    }, [])
    // console.log(cart);
    const addToCart = (product) => {
        // console.log(product);
        // console.log('ok');
        if(cart.find(c => c.productId === product.id && c.userId === currentUserLocalStorage.id)){
            return
        }
        dispatch(postFetchCart({
            id: new Date().getTime().toString(),
            userId:currentUserLocalStorage.id,
            productId: product.id,
            title:product.title,
            price:product.price,
            description: product.description,
            category:product.category,
            image:product.image,
            count: 1,
            totalAmount: product.totalAmount,
            rating:product.rating ? product.rating : ''
        }))
        // dispatch(editFetchProduct({
        //     ...product,
        //     totalAmount:product.totalAmount - 1
        // }))
        
    }

    // let currentUsersWishList =  cart.filter(c => c.userId === currentUser.id)
    // console.log(currentUsersWishList);
    return (
        <div id='productsPage'>
             <div className='row'>
                    {products != null ? 
                    products.map(product => (
                        <div className='box' key={product.id}>
                            <img src={product.image} alt={product.title}/>
                            <p>Category - {product.category}</p>
                            <h5>{product.title}</h5>
                            <span className='productPrice'>Price - {product.price}$</span>
                            <small> <span style={{textAlign:'enter'}}>Description</span> <br></br>
                            {product.description.substring(0,product.description.indexOf('.'))}</small>
                            <div className='productRate'> 
                                {/* <input type='range' max={5} value={product.rating.rate} readOnly onChange={() => {}} />
                                <div> 
                                    <small>Rate - {product.rating.rate ? product.rating.rate : 0} / 5 </small>
                                </div> */}
                                <Box
                                    sx={{
                                        '& > legend': { mt: 2 },
                                    }}
                                    >
                                    <Typography component="legend">Rate</Typography>
                                        <Rating
                                            name="simple-controlled"
                                            value={product.rating.rate}
                                            onChange={(event, newValue) => {
                                            setValue(newValue);
                                            }}
                                    />
                                    
                                    </Box>
                            </div>
                            <button className='addToCart' 
                            style={cart.find(c => c.productId === product.id && c.userId === currentUserLocalStorage.id) && {backgroundColor:'#00801999'}} 
                                onClick={() => {
                                addToCart(product)
                            }}>
                                {
                                cart.find(c => c.productId === product.id && c.userId === currentUserLocalStorage.id)
                                ? "Allready Added" 
                                : "Add to cart"
                                }
                                </button>
                        </div>
                    ))
                    : <h2>No Products</h2>
                    }   
                </div>
        </div>
    );
};

export default ProductsPage;