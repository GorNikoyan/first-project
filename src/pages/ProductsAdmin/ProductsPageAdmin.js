import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFetchProduct, editFetchProduct, fetchProducts, getFetchProducts, postFetchProducts } from '../../store/slices/productsData/productsDataApi';
import { selectProductsData } from '../../store/slices/productsData/productsSlice';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBottleWater, faDollar, faEdit, faListCheck, faListNumeric, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ProductsPageAdmin.css';
const ProductsPageAdmin = () => {
    const dispatch = useDispatch();
    const {products} = useSelector(selectProductsData)
    useEffect(() => {
        dispatch(getFetchProducts())
    }, [])
    const onChangeImage = (e) => {
        let reader = new FileReader();
        reader.onload = () => {
            setBase64Code(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const productRef = useRef(null);
    const [show, setShow] = useState(false)
    const [base64Code, setBase64Code] = useState('');
    const [formData,setFormData] = useState({
        id: '',
        title:  '',
        price: '',
        description: '',
        category: '',
        totalAmount:'',
        image: '',
        rating: ''
    })
    const changeInputsValues = (e) => {
        const {name,value} = e.target
        setFormData({ ...formData,[name]:value })

    }
    
    const handlerSubmit = (e) => {
        e.preventDefault();
        const [{value: title}, {value: price}, {value: description}, {value: category},{value: totalAmount}] = productRef.current
        if(formData.id) {
            dispatch(editFetchProduct({
                id: formData.id,
                title,
                price,
                description,
                category,
                totalAmount,
                rating:'',
                image: base64Code ? base64Code : formData.image
            }))
            setFormData({
                id: '',
                title:  '',
                price: '',
                description: '',
                category: '',
                totalAmount:'',
                image: '',
                rating: ''
            })
            setShow(!show)
            alert('Product Edited')
            return
            
        }else {
            dispatch(postFetchProducts({
                id: new Date().getTime().toString(),
                title,
                price,
                description,
                category,
                totalAmount,
                rating:'',
                image: base64Code
            }))
            setFormData({
                id: '',
                title:  '',
                price: '',
                description: '',
                category: '',
                totalAmount:'',
                image: '',
                rating: ''
            })
            setShow(!show)
            alert('Product added')
        }
    }
    const handlerEdit = (product) => {
        setFormData({
            id:product.id,
            title:product.title,
            price:product.price,
            description: product.description,
            category:product.category,
            totalAmount:product.totalAmount,
            image:product.image,
            rating:product.rating,
        })
        setShow(!show)
    }
    const handlerDelete = (id) => {
        console.log(id);
        dispatch(deleteFetchProduct(id))
    }
    console.log(products);
    return (
        <div id='productsPage'>
            <h2 style={{textAlign:'center'}}>Products</h2>
            <button className='addProductsBtn'
                    onClick={(e) => {
                        setShow(!show)
                        console.log(show);
                    }}
                >Add new Product <FontAwesomeIcon icon={faBottleWater} /></button>
            <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Total Amount</th>
                            <th>Image</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products != null ? products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.price}$</td>
                                <td>{product.description}</td>
                                <td>{product.category}</td>
                                <td>{product.totalAmount}</td>
                                <td>
                                    <img src={product.image} alt={product.title}/> 
                                </td>
                                <td>
                                    {product.rating ? product.rating.rate : ''} 
                                </td>
                                <td>
                                    <button onClick={() => {
                                        handlerEdit(product)
                                        }}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button style={{marginInline:'5px'}} onClick={() => {
                                        handlerDelete(product.id)
                                    }}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    </td>
                            </tr>
                        ))
                        : ''
                        }     
                    </tbody>              
            </table>
                <section id='myModal' className={!show ? '' : 'show-modal'} style={ !show ? {display:'none'} : {display: 'inline'}}>
                <div id='block'>
                    <h2 style={{textAlign:'center'}}>Edit user</h2>
                    <form ref={productRef} onSubmit={handlerSubmit}>
                        <div className='box'>
                            <label>Title</label>
                            <FontAwesomeIcon icon={faBottleWater} className='icon'/>
                            <input type='text' placeholder='Title' 
                                name="title" id="title"
                                value={formData.title ? formData.title : ''}
                                onChange={changeInputsValues}
                            />
                        </div>
                        <div className='box'>
                            <label>Price</label>
                            <FontAwesomeIcon icon={faDollar} className='icon'/>
                            <input type='text' placeholder='Price'
                                name="price" id="price"
                                value={formData.price ?  formData.price : ''} 
                                onChange={changeInputsValues}
                            />
                        </div>
                        <div className='box'>
                            <label >Description</label>
                            <textarea rows="5" cols="55"
                                name="description" id="description"
                                value={formData.description ? formData.description : ''}
                                onChange={changeInputsValues}
                            >Description</textarea>
                        </div>
                        <div className='box' style={{position: 'relative'}}>
                            <label>Category</label>
                            <FontAwesomeIcon icon={faListCheck} className='icon'/>
                            <select placeholder='Category' name="category" id="category" value={formData.category} onChange={changeInputsValues}>
                                <option value='men`s clothing'>men's clothing</option>
                                <option value='women`s clothing'>women's clothing</option>
                                <option value='jewelery'>jewelery</option>
                                <option value='electronics'>electronics</option>
                            </select>
                        </div>
                        <div className='box'>
                            <label>Total Amount</label>
                            <FontAwesomeIcon icon={faListNumeric} className='icon'/>
                            <input type='text' placeholder='Total Amount'
                                name="totalAmount" id="totalAmount"
                                value={formData.totalAmount ?  formData.totalAmount : ''} 
                                onChange={changeInputsValues}
                            />
                        </div>
                        <div className='box'>
                            <label>Choose an image</label>
                            <input type='file'
                                onChange={(e) => {
                                    onChangeImage(e)
                                }}
                            />
                        </div>
                        <div id='footer'>
                            <button
                                style={{
                                    padding: '10px',
                                    backgroundColor: '#ED9C29',
                                    color: 'white',
                                    border: '0',
                                    borderRadius: '5px',
                                    cursor:'pointer'
                                }}>
                                { formData.id > 0 ? 'Edit' : 'Add Product'}
                            </button>
                            <button 
                            onClick={(e) => {
                                e.preventDefault()
                                setShow(!show)
                                setFormData({
                                    id: '',
                                    title:  '',
                                    price: '',
                                    description: '',
                                    category: '',
                                    totalAmount:'',
                                    image: '',
                                    rating: ''
                                })
                                setBase64Code('')
                            }}
                            style={{
                                padding: '10px',
                                backgroundColor: 'Blue',
                                color: 'white',
                                border: '0',
                                borderRadius: '5px',
                                cursor:'pointer'
                            }}>Close</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ProductsPageAdmin;