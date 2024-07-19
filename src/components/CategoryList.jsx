import React, { useEffect, useState } from 'react';
import makeRequest from '../axios';
import { Link } from 'react-router-dom'

const CategoryList = () => {

    // State to store product from each category
    const [categoryProduct, setCategoryProduct] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    // Array to represent loading
    const categoryLoading = new Array(12).fill(null);

    // Fetch data
    const fetchCategoryProduct = async() => {
        try {
            setIsLoading(true);
            const res = await makeRequest.get('/get-oneCategory');
        
            setCategoryProduct(res.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
        {
            isLoading ? (
                categoryLoading.map((item,index) => {
                    return(
                        <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>
                        </div>
                    );
                })
            ) : (
                categoryProduct.map((product,index) => {
                    return(
                        <Link to={`/product-category?category=${product?.category}`} className='cursor-pointer' key={index}>
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                            <img src={`http://localhost:3500${product?.productImage[0]}`} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                        </Link>
                    )
                })
            )
        }
        </div>
    </div>
  )
}

export default CategoryList;