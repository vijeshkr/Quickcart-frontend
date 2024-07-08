import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct';
import makeRequest from '../axios';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct,setAllProduct] = useState([]);
  const fetchAllProduct = async() =>{
    try {
      
    const res = await makeRequest.get('/get-product')

    // console.log("product data",res)

    setAllProduct(res?.data?.data || [])
    } catch (error) {
      console.error('Failed to fetch product data', error);
    }
  }

  useEffect(()=>{
    fetchAllProduct();
  },[]);

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-semibold'>All Products</h2>
        <button onClick={() => setOpenUploadProduct(true)} className='border border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white transition-all py-1 px-3 rounded-full'>Upload Product</button>
      </div>
      {/* All products */}
      <div className='flex items-center flex-wrap gap-5 p-4 h-[calc(100vh-190px)] overflow-y-scroll'>
          {
            allProduct.map((product,index)=>{
              return(
                <AdminProductCard
                 data={product} key={index} fetchdata={fetchAllProduct}/>
                
              )
            })
          }
        </div>
      {/* Upload product */}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchdata={fetchAllProduct}/>
        )
      }
    </div>
  )
}

export default AllProducts