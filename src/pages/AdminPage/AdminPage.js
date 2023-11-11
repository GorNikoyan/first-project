import React, { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getCurrentUser, getEditingUser, selectregisterData } from '../../store/slices/registrationData/registrationSlice';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faUser,
    faLock,
    faRightToBracket,
    faEnvelope,
    faEye,
    faEyeSlash,
    faTrash,
    faEdit,
    faUserPlus,
    faUserLargeSlash,
} from '@fortawesome/free-solid-svg-icons'
import './AdminPage.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { deleteFetchUser, editFetchBlockedUser, editFetchUser, getBlockedFetchUser, getFetchUser, postBlockedFetchUser, postFetchUser, unBlockFetchUser } from '../../store/slices/registrationData/registrationDataApi';


const AdminPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registerRef = useRef(null);
    const [eyeOpen, setEyeOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [base64Code, setBase64Code] = useState('');
    const { usersData, editingUser, blockedUsers, isAdminAuth} = useSelector(selectregisterData)
    const [formData,setFormData] = useState({
        id: '',
        name:  '',
        lastName: '',
        login: '',
        password:'',
        confirmPassword: '',
        email: '',
        avatar: ''
    })
    const changeInputsValues = (e) => {
        const {name,value} = e.target
        setFormData({ ...formData,[name]:value })

    }
    const [errors, setErrors] = useState({
        wrongPassword: false,
        userExists: false
    })
    useEffect(() => {
        dispatch(getFetchUser())
        dispatch(getBlockedFetchUser())
        
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
        if (confirmPassword !== password) {
            setErrors({
                ...errors,
                wrongPassword: true
            })
            return
        } else if(editingUser) {
            dispatch(editFetchUser({
                id: formData.id,
                name,
                lastname,
                login,
                password,
                email,
                avatar: base64Code ? base64Code : formData.avatar
            }))
            dispatch(editFetchBlockedUser({
                id: formData.id,
                name,
                lastname,
                login,
                password,
                email,
                avatar: base64Code ? base64Code : formData.avatar
            }))
            
            setFormData({
                id: '',
                name:'',
                lastname:'',
                login: '',
                password:'',
                confirmPassword:'',
                email:'',
                avatar: ''
            })
            setShow(!show)
            alert('User Edited')
            return
            
        }else {
            dispatch(postFetchUser({
                id: new Date().getTime().toString(),
                name,
                lastname,
                login,
                password,
                email,
                avatar: base64Code
            }))
            setFormData({
                id: '',
                name:'',
                lastName:'',
                login: '',
                password:'',
                confirmPassword:'',
                email:'',
                avatar: ''
            })
            setShow(!show)
            alert('User added')
        }
    }
    const handlerDelete = (id) => {
        dispatch(deleteFetchUser(id))
    }
    const handlerEdit = (editUser) => {
        setFormData({
            id:editUser.id,
            name:editUser.name,
            lastName:editUser.lastname,
            login: editUser.login,
            password:editUser.password,
            confirmPassword:editUser.password,
            email:editUser.email,
            avatar:editUser.avatar
        })
        dispatch(getEditingUser(editUser));
        setShow(!show)
    }
    const handlerBlockUser = (user) => {
        
        if(blockedUsers.length > 0){
            const IsUserBlocked = blockedUsers.find(u => u.id === user.id)
            // console.log(IsUserBlocked);
            IsUserBlocked ? dispatch(unBlockFetchUser(user.id))
            : dispatch(postBlockedFetchUser(user))
        }else{
            dispatch(postBlockedFetchUser(user))
        }
    }
    const changePass = (password) => {
    password = password.split('')
    if(password.length > 2){
        password[3] = '*'
        password[2] = '*'
        password[4] = '*'
        }
    return password = password.join('')
   }
   console.log(usersData);
    return (
        <div id='adminPage'>
            <div>
                <h2 style={{textAlign:'center'}}>Users</h2>
                <button className='addUserBtn'
                    onClick={(e) => {
                        setShow(!show)
                    }}
                >Add new User <FontAwesomeIcon icon={faUserPlus} /></button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Login</th>
                            <th>Password</th>
                            <th>Email</th>
                            <th>Avatar</th>
                            <th>Is admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData != null ? usersData.map(user => (

                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.lastname}</td>
                                <td>{user.login}</td>
                                <td>{
                                    changePass(user?.password)
                                }</td>
                                <td>{user.email}</td>
                                <td>
                                    <img src={user.avatar} />
                                </td>
                                <td>{user.admin ? 'Yas' : 'No'}</td>
                                <td>
                                    <button onClick={() => {
                                        handlerEdit(user)
                                        }}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button style={{marginInline:'5px'}} onClick={() => {
                                        handlerDelete(user.id)
                                    }}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <button 
                                    style={blockedUsers.find(u => u.id === user.id ) && {border:'2px solid red',color:'red'}}
                                    onClick={() => {
                                        handlerBlockUser(user)
                                    }}>
                                        <FontAwesomeIcon icon={faUserLargeSlash}  />
                                    </button>
                                    </td>
                                </tr>
                            ))
                        : ''
                        }     
                    </tbody>              
                </table>
            </div>
            <section id='myModal' className={!show ? '' : 'show-modal'} style={ !show ? {display:'none'} : {display: 'inline'}}>
                <div id='block'>
                    <h2 style={{textAlign:'center'}}>Edit user</h2>
                    <form ref={registerRef} onSubmit={handlerSubmit}>
                        {errors.userExists &&
                            <span style={{color: 'red', textAlign: 'center'}}>
                                User allready exists! Please try other Login or Email.
                            </span>
                        }
                        <div className='box'>
                            <label>Name</label>
                            <FontAwesomeIcon icon={faUser} className='icon'/>
                            <input type='text' placeholder='name' 
                                name="name" id="name"
                                value={formData.name ? formData.name : ''}
                                onChange={changeInputsValues}
                            />
                        </div>
                        <div className='box'>
                            <label>Last Name</label>
                            <FontAwesomeIcon icon={faUser} className='icon'/>
                            <input type='text' placeholder='last Name'
                                name="lastName" id="lastName"
                                value={formData.lastName ?  formData.lastName : ''} 
                                onChange={changeInputsValues}
                            />
                        </div>
                        <div className='box'>
                            <label>Login</label>
                            <FontAwesomeIcon icon={faRightToBracket} className='icon'/>
                            <input type='text' placeholder='login'
                                name="login" id="login"
                                value={formData.login ? formData.login : ''}
                                onChange={changeInputsValues}
                            />
                        </div>
                        <div className='box' style={{position: 'relative'}}>
                            <label>Password</label>
                            <FontAwesomeIcon icon={faLock} className='icon'/>
                            <input type={eyeOpen ? 'text' : 'password'} 
                                placeholder='password' name="password" id="password"
                                value={formData.password ? formData.password :  ''} 
                                onChange={changeInputsValues}
                            />
                            <FontAwesomeIcon icon={eyeOpen ? faEye : faEyeSlash} className='fa-lg'
                                style={{position: 'absolute', right: '135px', color: 'blue'}}
                                onClick={() => {
                                    setEyeOpen(!eyeOpen)
                                }}
                            />
                        </div>
                        <div className='box' style={{position: 'relative'}}>
                            <label>Confirm Password</label>
                            <FontAwesomeIcon icon={faLock} className='icon'/>
                            <input type={eyeOpen ? 'text' : 'password'} placeholder='Confirm Password'
                                name="confirmPassword" id="confirmPassword"
                                value={formData.confirmPassword ? formData.confirmPassword : ''} 
                                onChange={changeInputsValues}
                            />
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
                            <input type='text' placeholder='email' 
                                name="email" id="email"
                                value={formData.email ? formData.email :  ''} 
                                onChange={changeInputsValues}
                            />
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
                                    borderRadius: '5px',
                                    cursor:'pointer'
                                }}>
                                { editingUser ? 'Edit' : 'Register user'}
                            </button>
                            <button 
                            onClick={(e) => {
                                e.preventDefault()
                                setShow(!show)
                                setFormData({
                                    id: '',
                                    name:'',
                                    lastName:'',
                                    login: '',
                                    password:'',
                                    confirmPassword:'',
                                    email:'',
                                    avatar: ''
                                })
                                setBase64Code('')
                                dispatch(getEditingUser(null))
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

export default AdminPage;