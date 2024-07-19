import React, { useContext, useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../context';
import makeRequest from '../axios';
import { toast } from 'react-toastify';
import ROLE from '../common/role';

const Navbar = () => {

    // Destructure user details from contextApi
    const { userDetails, setUserDetails, cartProductCount, fetchAddToCart } = useContext(UserContext);

    useEffect(() => {
        fetchAddToCart(); // Fetch cart count on mount
    }, [fetchAddToCart])

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
            toast.success(res.data.message);
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

    // Search
    const searchInput = useLocation();
    const URLSearch = new URLSearchParams(searchInput?.search);
    const searchQuery = URLSearch.getAll("q");
    const [search, setSearch] = useState(searchQuery);

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);

        if(value){
            navigate(`/search?q=${value}`);
        }else{
            navigate('/search');
        }
    }

    // Search bar open close state for smaller devices
    const [openSearch, setOpenSearch] = useState(false);
    
    // Toggle function for open and close search bar for smaller devices
    const ToggleSearch = () => {
        setOpenSearch(!openSearch);
    }
    return (
        <header className='h-16 shadow-md sticky top-0 bg-white z-30'>
            {/* Container div */}
            <div className='h-full container mx-auto flex items-center px-4 justify-between '>
                <Link to={'/'}><h1 className='font-bold text-2xl text-primaryColor cursor-pointer'>QUICKCART</h1></Link>
                {/* Search bar section */}
                <div className='hidden lg:flex items-center w-full justify-between max-w-md border rounded-md p-2 focus-within:border-rose-500'>
                    <input onChange={handleSearch} value={search} className='px-2 w-full outline-none' type="text" placeholder='Search for Products,Brands and More' />
                    <div className='cursor-pointer'>
                        <IoSearchOutline className='text-neutral-400 text-xl' />
                    </div>
                </div>
                {/* Search bar for smaller device */}
                {
                    openSearch && <div className='fixed top-14 left-0 right-0 m-3 flex justify-center lg:hidden'>
                    <div className='w-full max-w-md bg-white border rounded-md p-2 flex items-center focus-within:border-rose-500'>
                        <input onChange={handleSearch} value={search} className='px-2 w-full outline-none' type="text" placeholder='Search for Products,Brands and More' />
                        <div className='cursor-pointer'>
                            <IoSearchOutline className='text-neutral-400 text-xl' />
                        </div>
                    </div>
                </div>
                }
                {/* Icons section */}
                <div className='flex items-center gap-2 sm:gap-4'>
                    {/* Search icon for small devices */}
                    <div onClick={ToggleSearch} className='text-2xl cursor-pointer lg:hidden'>
                        <CiSearch />
                    </div>
                    {/* <div className='text-2xl cursor-pointer'>
                        <CiHeart />
                    </div> */}
                    <div className='text-2xl cursor-pointer relative'>
                        <Link to={'/cart'}>
                            <span><CiShoppingCart /></span>
                            {
                              cartProductCount > 0 && userDetails &&
                              <div className='text-xs bg-primaryColor text-white p-1 w-5 flex justify-center items-center rounded-full font-semibold absolute -bottom-3 -right-3'>{cartProductCount}</div>
                            }
                        </Link>
                    </div>
                    <div onClick={handleToggle} className='text-2xl cursor-pointer relative'>
                        <div>
                            <CiUser />
                        </div>
                        {showMyProfile && <div className='absolute top-9 -left-8 w-28 text-sm bg-white shadow-md'>
                            <div className='hover:bg-gray-100 px-3 py-2'>My profile</div>
                            {userDetails?.role === ROLE.ADMIN && <Link to={'/admin'}><div className='hover:bg-gray-100 px-3 py-2 md:block hidden'>Admin Panel</div></Link>}
                        </div>
                        }
                    </div>
                    <div>
                        {userDetails ?
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