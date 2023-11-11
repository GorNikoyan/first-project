import React from 'react';
import { selectregisterData } from '../../store/slices/registrationData/registrationSlice';
import { useSelector } from 'react-redux';
import './HomePage.css'
const HomePage = () => {
    const {currentUser} = useSelector(selectregisterData);
    return (
        <div>
            <section id='HeroSection'>
                <div >
                    <div style={{display:'flex'}}>
                        <div className='info'>
                            <h1>
                                The Lowest Prices in Armenia
                            </h1>
                            <p>Shop Best Buy for electronics, computers, appliances, cell phones, video games & more new tech. In-store pickup & free 2-day shipping on thousands of items.</p>
                            <h2 style={{color:'blueviol'}}>
                                Electronics<br></br>
                                Man's Clothing<br></br>
                                Woman's Clothing<br></br>
                                Jewelery<br></br>
                            </h2>
                        </div>
                        <div className=''>
                            <img src='https://thumbs.dreamstime.com/b/magicstore-open-again-store-market-shop-opened-business-reopening-concept-woman-standing-to-welcome-customers-187678105.jpg' />
                        </div>
                    </div>
                </div>
            </section>
            <section id='Electronics'>
                <div style={{padding:'20px'}}>
                    <h1 style={{textAlign:'center',color:'white'}}>Electronics</h1>
                    <p style={{textAlign:'center',color:'white'}}>A large assortment of electronics with the lowest prices</p>
                </div>  
            </section>
            <section id='MansClothing'>
                <div style={{padding:'20px'}}>
                    <h1 style={{textAlign:'center',color:'rgb(39 40 42)'}}>Man's Clothing</h1>
                    <h2 style={{textAlign:'center',color:'rgb(39 40 42)'}}>These 32 Men’s Clothing Brands Make Great Style Dead Simple</h2>
                </div>
            </section>
            <section id='WomansClothing'>
                <div style={{padding:'100px'}}>
                    <h1 style={{color:'rgb(255, 213, 0)'}}>Woman's Clothing</h1>
                    <h2 style={{color:'rgb(255, 213, 0)'}}>Tops, Dresses, Denim + More</h2>
                </div>
            </section>
            <section id='Jewelery'>
                <div style={{padding:'20px'}}>
                    <h1 style={{textAlign:'center',color:'rgb(217, 97, 6)'}}>Jewelery</h1>
                    <h2 style={{textAlign:'center',color:'rgb(217, 97, 6)'}}>These 32 Men’s Clothing Brands Make Great Style Dead Simple</h2>
                </div>
            </section>
            {/* {currentUser.name} */}
        </div>
    );
};

export default HomePage;