import React, { useContext, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context';
import makeRequest from '../axios';
import { toast } from 'react-toastify';

const Navbar = () => {
    
    // Destructure user details from contextApi
    const { userDetails, setUserDetails } = useContext(UserContext);

    // Show my profile section
    const [showMyProfile, setShowMyProfile] = useState(false);

    // Toggle function for show my profile
    const handleToggle = () => {
        setShowMyProfile(!showMyProfile);
    }

    const navigate = useNavigate();

    // Logout function
    const handleLogout = async () => {
        try {
            const res = await makeRequest.post('/logout');
            setUserDetails(null);
            console.log(res.data.message);
            toast.success(res.data.message);
            navigate("/");
        } catch (error) {
            // console.error(error.response?.data?.message || 'Logout failed');
            // toast.error(error.response?.data?.message || 'Logout failed');
            console.log(error)
        }
    }

    return (
        <header className='h-16 shadow-md sticky top-0 bg-white'>
            {/* Container div */}
            <div className='h-full container mx-auto flex items-center px-4 justify-between'>
                <Link to={'/'}><h1 className='font-bold text-2xl text-primaryColor cursor-pointer'>QUICKCART</h1></Link>
                {/* Search bar section */}
                <div className='hidden lg:flex items-center w-full justify-between max-w-md border rounded-md p-2 focus-within:border-rose-500'>
                    <input className='px-2 w-full outline-none' type="text" placeholder='Search for Products,Brands and More' />
                    <div className='cursor-pointer'>
                        <IoSearchOutline className='text-neutral-400 text-xl' />
                    </div>
                </div>
                {/* Icons section */}
                <div className='flex items-center gap-2 sm:gap-4'>
                    {/* Search icon for small devices */}
                    <div className='text-2xl cursor-pointer lg:hidden'>
                        <CiSearch />
                    </div>
                    <div className='text-2xl cursor-pointer'>
                        <CiHeart />
                    </div>
                    <div className='text-2xl cursor-pointer relative'>
                        <span><CiShoppingCart /></span>
                        <div className='text-xs bg-primaryColor text-white p-1 w-5 flex justify-center items-center rounded-full font-semibold absolute -bottom-3 -right-3'>0</div>
                    </div>
                    <div onClick={handleToggle} className='text-2xl cursor-pointer relative'>
                        <div>
                        <CiUser />
                        </div>
                        {showMyProfile && <div className='absolute top-9 -left-8 w-24 text-center p-2 text-sm cursor-pointer bg-white hover:bg-gray-100 shadow-md'>
                            My profile
                        </div>}
                    </div>
                    <div>
                        {   userDetails ?
                        <button onClick={handleLogout} className='border px-3 py-1 rounded-md text-sm hover:border-primaryColor hover:text-primaryColor'>Logout</button>
                        :
                         <Link to={'/login'} className='border px-3 py-1 rounded-md text-sm hover:border-primaryColor hover:text-primaryColor'>Login</Link>
                            
                            }
                    </div>
                </div>

            </div>

        </header>
    )
}

export default Navbar