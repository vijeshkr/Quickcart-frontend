import React, { useEffect, useState } from 'react'
import makeRequest from '../axios';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [openUpdateRole,setOpenUpdateRole] = useState(false);
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id  : ""
    });

    const fetchAllUsers = async () => {
        try {
            const res = await makeRequest.get('/all-users');
            setAllUsers(res.data.data);
        } catch (error) {
            console.error(error.response.data.message || 'Server error');
            toast.error(error.response.data.message || 'Server error');
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllUsers();
    },[]);
  return (
    <div className='pb-4'>
        <table className='w-full'>
            <thead>
                <tr className='bg-bgRose text-black '>
                    <th className='font-semibold'>No.</th>
                    <th className='font-semibold'>Name</th>
                    <th className='font-semibold'>Email</th>
                    <th className='font-semibold'>Role</th>
                    <th className='font-semibold'>Created Date</th>
                    <th className='font-semibold'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    allUsers.map((userData,index) => {
                        return(
                            <tr key={index} className='text-center'>
                                <td>{index+1}</td>
                                <td>{userData?.name}</td>
                                <td>{userData?.email}</td>
                                <td>{userData?.role}</td>
                                <td>{moment(userData?.createdAt).format('LL')}</td>
                                <td>
                                <button className='bg-bgRose p-2 rounded-full cursor-pointer hover:bg-primaryColor hover:text-white' 
                                    onClick={()=>{
                                        setUpdateUserDetails(userData);
                                        setOpenUpdateRole(true);

                                    }}
                                    >
                                        <MdModeEdit/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        {
            openUpdateRole && (
                <ChangeUserRole
                onClose={() => setOpenUpdateRole(false)}
                name={updateUserDetails.name}
                email={updateUserDetails.email}
                role={updateUserDetails.role}
                userId={updateUserDetails._id}
                callAllUsers={fetchAllUsers}
                />
            )
        }

    </div>
  )
}

export default AllUsers