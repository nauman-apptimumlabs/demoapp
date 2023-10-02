import React, {useState} from 'react';
import './signin.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://127.0.0.1:3000/api/v1/users',
                {
                    user: formData,
                }
            );
            toast.success('Your account has been created successfully. Please log in.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            navigate('/sign-in?signup=success');
        } catch (error) {
            console.error('Signup error', error);
        }
    };

    return (
        <div className='main'>
            <div className='row justify-content-center align-items-center min-vh-100'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <h3 className='text-center my-3'>Sign Up</h3>
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
                                    <label htmlFor='password_confirmation' className='form-label'>
                                        Confirm Password
                                    </label>
                                    <input
                                        type='password'
                                        className='form-control'
                                        id='password_confirmation'
                                        name='password_confirmation'
                                        placeholder='Confirm password'
                                        value={formData.password_confirmation}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className='d-grid'>
                                    <button type='submit' className='btn btn-primary'>
                                        Submit
                                    </button>
                                </div>
                                <p className='forgot-password text-right mt-3'>
                                    Already have an account? <a href='/sign-in'>Sign In</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
