import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context';
import { CiUser } from "react-icons/ci";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import LoadingComponent from '../components/Loading';

export const AdminPanel = () => {
    const { userDetails } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    // If user is not admin redirect to the home page
    useEffect(() => {
        if (userDetails) {
            if (userDetails.role !== ROLE.ADMIN) {
                console.log(userDetails.role);
                navigate('/');
            } else {
                setIsLoading(false); // Role check is complete and user is an admin
            }
        } else {
            setIsLoading(false); // Set loading to false if userDetails is not available
        }
    }, [userDetails, navigate]);

    if (isLoading) {
        return <LoadingComponent />;
    }
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <aside className='bg-rose-50 m-h-full w-full max-w-60 shadow-sm'>
            <div className='h-32 flex justify-center items-center flex-col'>
                <div className='text-5xl cursor-pointer flex justify-center'>
                    <CiUser/>
                </div>
                <p className='capitalize text-lg font-semibold'>{userDetails?.name}</p>
                <p className='text-sm'>{userDetails?.role}</p>
            </div> 
            {/* Navigation */}  
            <div>
                <nav className='grid p-4'>
                    <Link to={''} className='px-2 py-1 hover:bg-primaryColor hover:text-white' >All Users</Link>
                    <Link to={'all-products'} className='px-2 py-1 hover:bg-primaryColor hover:text-white'>All Products</Link>
                </nav>
            </div>     
        </aside>
        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
  )
}
