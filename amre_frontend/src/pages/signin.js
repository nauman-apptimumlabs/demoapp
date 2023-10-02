import React, { useState } from 'react';
import './signin.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';


const SignIn = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://127.0.0.1:3000/api/v1/login',
                {
                    email: formData.email,
                    password: formData.password,
                }
            );

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setIsLoggedIn(true);
                toast.success('Sign in successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
                navigate('/');
            } else {
                console.error('Login error: Token not received');
            }
        } catch (error) {
            console.error('Login error', error);
        }
    };

    return (
        <div className='main'>
            <div className='row justify-content-center align-items-center min-vh-100'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <h3 className='text-center my-3'>Sign In</h3>
                                <div className='mb-3'>
                                    <label htmlFor='email' className='form-label'>
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        id='email'
                                        name='email'
                                        placeholder='Enter email'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='password' className='form-label'>
                                        Password
                                    </label>
                                    <input
                                        type='password'
                                        className='form-control'
                                        id='password'
                                        name='password'
                                        placeholder='Enter password'
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <div className='form-check'>
                                        <input
                                            type='checkbox'
                                            className='form-check-input'
                                            id='customCheck1'
                                        />
                                        <label className='form-check-label' htmlFor='customCheck1'>
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <div className='d-grid'>
                                    <button type='submit' className='btn btn-primary'>
                                        Submit
                                    </button>
                                </div>
                                <p className='forgot-password text-right mt-3'>
                                    Don't have an account? <a href='/sign-up'>Sign Up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
