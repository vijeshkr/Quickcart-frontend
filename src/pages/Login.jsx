import React, { useContext, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import makeRequest from '../axios';
import { toast } from 'react-toastify';
import UserContext from '../context';

export const Login = () => {

    const { fetchUserDetails } = useContext(UserContext);


    const [showPassword, setShowPassword] = useState(false);
    const [showEyeIcon, setShowEyeIcon] = useState('hidden');

    const navigate = useNavigate();

    // Data from inputbox
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const handleOnChange = (e) => {
        const {name, value} = e.target;

        setData((prev) => {
            return{
                ...prev,
                [name] : value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await makeRequest.post('/login',data);
            toast.success(res.data.message);
            // Set data in the context
            await fetchUserDetails();
            
            if(res.data.data.role == "ADMIN"){
                navigate('/admin');
            }else{
                navigate('/');
            }
            

        } catch (error) {
            console.error(error.response.data.message || 'Login failed');
            toast.error(error.response.data.message || 'Login failed');
        }
    }

    // Eye icon toggle fuction for password visibility
    const handleMouseDown = (e) => {
        // Prevents losing focus on the input field
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <div id='login' className='bg-bgRose h-screen'>
            <div className='mx-auto container h-full p-10'>
                <div className='bg-white h-4/6 px-10 py-14 max-w-sm mx-auto'>
                    <h1 className='text-xl font-semibold py-5 text-gray-600'>Login to your account</h1>
                    <form onSubmit={handleSubmit} action="">
                        <div className='pb-5'>
                            <input
                                name='email'
                                value={data.email}
                                onChange={handleOnChange}
                                className='border w-full outline-none p-2 focus:border-black text-sm'
                                type="email"
                                placeholder='Email' />
                        </div>
                        <div className='pb-5 '>
                            <div className='flex border focus-within:border-black items-center text-sm'>
                                <input
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    onFocus={() => setShowEyeIcon('')}
                                    onBlur={() => setShowEyeIcon('hidden')} type={showPassword ? 'text' : 'password'} className='w-full outline-none p-2' placeholder='Password' />
                                <div className={`p-2 cursor-pointer ${showEyeIcon}`} onMouseDown={handleMouseDown}>
                                    <span className='text-gray-500'>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='pb-5 flex justify-end text-xs gap-1'>
                            Forgot your password?
                            <Link to={'/forgot-password'}><span className='cursor-pointer text-primaryColor font-semibold'>Reset here</span></Link>
                        </div>
                        <button className='bg-primaryColor text-white w-full py-2 text-sm'>Login</button>
                        <div className='pb-5 pt-5 flex justify-end text-xs gap-1'>
                            Don't have account?
                            <Link to={'/sign-up'}><span className='cursor-pointer text-primaryColor font-semibold'>Sign up</span></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
