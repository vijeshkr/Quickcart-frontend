import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className='h-16 shadow-md sticky top-0 bg-white'>
            {/* Container div */}
            <div className='h-full container mx-auto flex items-center px-4 justify-between'>
                <Link to={'/'}><h1 className='font-bold text-2xl text-rose-500 cursor-pointer'>QUICKCART</h1></Link>
                {/* Search bar section */}
                <div className='hidden lg:flex items-center w-full justify-between max-w-md border rounded-md p-2 focus-within:border-rose-500'>
                    <input className='px-2 w-full outline-none' type="text" placeholder='Search for Products,Brands and More' />
                    <div className='cursor-pointer'>
                        <IoSearchOutline className='text-neutral-400 text-xl' />
                    </div>
                </div>
                {/* Icons section */}
                <div className='flex items-center gap-4'>
                    {/* Search icon for small devices */}
                    <div className='text-2xl cursor-pointer lg:hidden'>
                        <CiSearch />
                    </div>
                    <div className='text-2xl cursor-pointer'>
                        <CiHeart />
                    </div>
                    <div className='text-2xl cursor-pointer relative'>
                        <span><CiShoppingCart /></span>
                        <div className='text-xs bg-rose-500 text-white p-1 w-5 flex justify-center items-center rounded-full font-semibold absolute -bottom-3 -right-3'>0</div>
                    </div>
                    <div className='text-2xl cursor-pointer'>
                        <CiUser />
                    </div>
                    <div>
                        <Link to={'/login'} className='border px-3 py-1 rounded-md text-sm hover:border-rose-500 hover:text-rose-500'>Login</Link>
                    </div>
                </div>

            </div>

        </header>
    )
}

export default Navbar