import React, { useContext } from 'react'
import UserContext from '../context';
import { CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom';

export const AdminPanel = () => {
    const { userDetails } = useContext(UserContext);
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
                    <Link className='px-2 py-1 hover:bg-slate-100' >All Users</Link>
                    <Link className='px-2 py-1 hover:bg-slate-100'>All Products</Link>
                </nav>
            </div>     
        </aside>
        <main className='w-full h-full p-2'>
            Outlet
        </main>
    </div>
  )
}
