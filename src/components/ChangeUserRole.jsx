import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import ROLE from '../common/role';
import makeRequest from '../axios';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    onClose,
    name,
    email,
    role,
    userId,
    callAllUsers
}) => {

    const [userRole, setUserRole] = useState(role);

    // Set user role
    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
    }

    // Update user role
    const updateUserRole = async () => {
        try {
            const res = await makeRequest.post('/update-user',{
                userId : userId,
                role : userRole
            });

            console.log(res.data.message);
            toast.success(res.data.message);
            onClose();
            callAllUsers();

        } catch (error) {
            console.error(error.response?.data?.message || 'Failed to update role');
            toast.error(error.response?.data?.message || 'Failed to update role');
            console.log(error);
        }
    }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-black bg-opacity-70'>
        <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
            <button className='block ml-auto' onClick={onClose}>
                <IoMdClose/>
            </button>

            <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>

            <p>Name : {name}</p>
            <p>Email : {email}</p>

            <div className='flex items-center justify-between my-4'>
                <p>Role :</p>
                <select className='border px-4 py-1 text-sm bg-bgRose' value={userRole} onChange={handleOnChangeSelect}>
                    {
                        Object.values(ROLE).map(item => {
                            return (
                                <option value={item} key={item}>{item}</option>
                            )
                        })
                    }
                </select>
            </div>
            <button onClick={updateUserRole} className='w-fit mx-auto block py-2 px-4 rounded-full bg-primaryColor text-white text-sm'>Change Role</button>
        </div>
    </div>
  )
}

export default ChangeUserRole