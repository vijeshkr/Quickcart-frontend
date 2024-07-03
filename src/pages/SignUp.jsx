import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showEyeIcon, setShowEyeIcon] = useState('hidden');

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showConfirmEyeIcon, setShowConfirmEyeIcon] = useState('hidden');

    // Data from inputbox
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    console.log(data);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    // Eye icon toggle fuction for password visibility
    const handleMouseDown = (e) => {
        // Prevents losing focus on the input field
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    // Eye toggle funcion for confirm password
    const handleMouseDownConfirmPassword = (e) => {
        // Prevents losing focus on the input field
        e.preventDefault();
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div id='login' className='bg-bgRose h-screen'>
            <div className='mx-auto container h-full p-10'>
                <div className='bg-white h-3/4 px-10 py-14 max-w-sm mx-auto'>
                    <h1 className='text-xl font-semibold py-5 text-gray-600'>Create account</h1>
                    <form onSubmit={handleSubmit} action="">
                        <div className='pb-5'>
                            <input
                                required
                                name='name'
                                value={data.name}
                                onChange={handleOnChange}
                                className='border w-full outline-none p-2 focus:border-black text-sm'
                                type="text"
                                placeholder='Name' />
                        </div>
                        <div className='pb-5'>
                            <input
                                required
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
                                    required
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
                        <div className='pb-5 '>
                            <div className='flex border focus-within:border-black items-center text-sm'>
                                <input
                                    required
                                    name='confirmPassword'
                                    value={data.confirmPassword}
                                    onChange={handleOnChange}
                                    onFocus={() => setShowConfirmEyeIcon('')}
                                    onBlur={() => setShowConfirmEyeIcon('hidden')} type={showConfirmPassword ? 'text' : 'password'} className='w-full outline-none p-2' placeholder='Confirm Password' />
                                <div className={`p-2 cursor-pointer ${showConfirmEyeIcon}`} onMouseDown={handleMouseDownConfirmPassword}>
                                    <span className='text-gray-500'>
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button className='bg-primaryColor text-white w-full py-2 text-sm'>Sign Up</button>
                        <div className='pb-5 pt-5 flex justify-end text-xs gap-1'>
                            Already have an account?
                            <Link to={'/login'}><span className='cursor-pointer text-primaryColor font-semibold'>Sign in</span></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp