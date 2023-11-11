import React, { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router';
import {getCurrentUser, isAuthAdmin, selectregisterData} from '../../store/slices/registrationData/registrationSlice';
import { getBlockedFetchUser, getFetchUser } from '../../store/slices/registrationData/registrationDataApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faEye,
    faEyeSlash,
    faLock,
    faEnvelope,
 } from '@fortawesome/free-solid-svg-icons'
import './LoginPage.css'
import { Link } from 'react-router-dom';
const LoginPage = () => {
    const loginRef = useRef(null);
    const navigate = useNavigate();
    const [eyeOpen,setEyeOpen] = useState(false)
    const {usersData, blockedUsers} = useSelector(selectregisterData)
    //console.log(usersData);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFetchUser())
        dispatch(getBlockedFetchUser())
    },[])
    const handlerSubmit = (e) => {
        e.preventDefault();
        const [{value:emailOrLogin},{value:password}] = loginRef.current
        const coorectInfo = usersData.find(user => (user.email === emailOrLogin || user.login === emailOrLogin) && user.password === password);
        const isCurenUserBlocked = blockedUsers.find(user => (user.id === coorectInfo.id))
        if(blockedUsers.find(user => (user.id == coorectInfo.id))){
            alert("you are blocked")
            return
        }else if(coorectInfo?.admin){
            // console.log(coorectInfo.admin);
            dispatch(isAuthAdmin(true))
            dispatch(getCurrentUser(coorectInfo))
            
            
            localStorage.removeItem("isAuthAdmin");
            localStorage.removeItem("currentUser");
            localStorage.setItem("currentUser", JSON.stringify(coorectInfo));
            localStorage.setItem("isAuthAdmin", "true");
            navigate('/adminPage')
            
            return
        } else if(coorectInfo){
            dispatch(getCurrentUser(coorectInfo))
            localStorage.removeItem("currentUser");
            localStorage.setItem("currentUser", JSON.stringify(coorectInfo));
            localStorage.removeItem("isAuthAdmin");
            localStorage.setItem("isAuthAdmin", "false");
            navigate('/homePage')
        }
        
    }
    return (
        <section id='login'>
            <div id='block'>
                <form ref={loginRef} onSubmit={handlerSubmit}>
                    <div className='box'>
                        <label>Email</label>
                        <FontAwesomeIcon icon={faEnvelope} className='icon'/>
                        <input type='text' placeholder='email'/>
                    </div>
                    <div className='box' style={{position:'relative'}}>
                        <label>Password</label>
                        <FontAwesomeIcon icon={faLock} className='icon'/>
                        <input type={eyeOpen ? 'text' : 'password'} placeholder='password'/>
                        <FontAwesomeIcon icon={eyeOpen ? faEye : faEyeSlash} className='fa-lg'
                            style={{position:'absolute',right:'90px',color:'blue'}}
                            onClick={() => {
                                setEyeOpen(!eyeOpen)
                            }}
                        />
                    </div>
                    <div id='footer'>
                        <button 
                            style={{padding:'10px',backgroundColor:'Blue',color:'white',border:'0',borderRadius:'5px'}}>
                            Login
                        </button>
                        <span>Don't have an account? <Link to="/">Register!</Link></span>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default LoginPage;