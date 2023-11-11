import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom"
import {getFetchUser, postFetchUser} from '../../store/slices/registrationData/registrationDataApi';
import {selectregisterData} from '../../store/slices/registrationData/registrationSlice';
import {useNavigate} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faUser,
    faRightToBracket,
    faLock,
    faEnvelope,
    faEye,
    faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'
import './RegisterPage.css'

const RegisterPage = () => {
    const registerRef = useRef(null);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {usersData, registerData} = useSelector(selectregisterData)
    const [eyeOpen, setEyeOpen] = useState(false)
    const [base64Code, setBase64Code] = useState('');
    const [errors, setErrors] = useState({
        wrongPassword: false,
        userExists: false
    })
    useEffect(() => {
        dispatch(getFetchUser())
    }, [])

    const onChangeImage = (e) => {
        let reader = new FileReader();
        reader.onload = () => {
            setBase64Code(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        const [{value: name}, {value: lastname}, {value: login}, {value: password}, {value: confirmPassword}, {value: email}] = registerRef.current
        const uniqUser = usersData.find(user => user.login === login || user.email === email)

        if (confirmPassword !== password) {
            setErrors({
                ...errors,
                wrongPassword: true
            })
            return
        } else if (uniqUser) {
            setErrors({
                ...errors,
                userExists: true
            })
            return
        } else {
            dispatch(postFetchUser({
                id: new Date().getTime().toString(),
                name,
                lastname,
                login,
                password,
                email,
                avatar: base64Code
            }))
            navigate('/LoginPage')
        }
    }
    return (
        <section id='register'>
            <div id='block'>
                <form ref={registerRef} onSubmit={handlerSubmit}>
                    {
                        errors.userExists &&
                        <span
                            style={{color: 'red', textAlign: 'center'}}>
                        User allready exists! Please try other Login or Email.
                    </span>

                    }
                    <div className='box'>
                        <label>Name</label>
                        <FontAwesomeIcon icon={faUser} className='icon'/>
                        <input type='text' placeholder='name'/>
                    </div>
                    <div className='box'>
                        <label>Last Name</label>
                        <FontAwesomeIcon icon={faUser} className='icon'/>
                        <input type='text' placeholder='last Name'/>
                    </div>
                    <div className='box'>
                        <label>Login</label>
                        <FontAwesomeIcon icon={faRightToBracket} className='icon'/>
                        <input type='text' placeholder='login'/>
                    </div>
                    <div className='box' style={{position: 'relative'}}>
                        <label>Password</label>
                        <FontAwesomeIcon icon={faLock} className='icon'/>
                        <input type={eyeOpen ? 'text' : 'password'} placeholder='password'/>
                        <FontAwesomeIcon icon={eyeOpen ? faEye : faEyeSlash} className='fa-lg'
                            style={{position: 'absolute', right: '90px', color: 'blue'}}
                            onClick={() => {
                                setEyeOpen(!eyeOpen)
                            }}
                        />
                    </div>
                    <div className='box' style={{position: 'relative'}}>
                        <label>Confirm Password</label>
                        <FontAwesomeIcon icon={faLock} className='icon'/>
                        <input type={eyeOpen ? 'text' : 'password'} placeholder='Confirm Password'/>

                    </div>
                    {
                        errors.wrongPassword &&
                            <span
                                style={{color: 'red', textAlign: 'center'}}>
                            Passwords do not match! Please try again.
                        </span>

                    }
                    <div className='box'>
                        <label>Email</label>
                        <FontAwesomeIcon icon={faEnvelope} className='icon'/>
                        <input type='text' placeholder='email'/>
                    </div>
                    <div className='box'>
                        <label>Choose an avatar</label>
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
                                borderRadius: '5px'
                            }}>
                            Sign up
                        </button>
                        <span>Already have an account? <Link to="/loginPage">Login</Link></span>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default RegisterPage;