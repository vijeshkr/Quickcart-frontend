import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import displayINRCurrency from '../helpers/displayCurrency';
import AdminEditProduct from './AdminEditProduct';
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const AdminProductCard = ({
  data,
  fetchdata
}) => {
  const [editProduct, setEditProduct] = useState(false)

  return (
    <div className='bg-slate-50 p-2 rounded '>
      <div className='w-40'>
        <div className='h-32 flex justify-center items-center'>
          <img src={`${backendUrl}${data?.productImage[0]}`} className='mx-auto object-cover h-full' />
        </div>
        <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

        <div className='flex justify-between'>

          <p className='font-semibold'>
            {
              displayINRCurrency(data.sellingPrice)
            }

          </p>            
            <div className='w-fit p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
              <MdModeEditOutline />
            </div>
          

        </div>


      </div>

      {
        editProduct && (
          <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
        )
      }

    </div>
  )
}

export default AdminProductCard;