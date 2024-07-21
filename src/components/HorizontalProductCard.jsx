import React, { useContext, useEffect, useRef, useState } from 'react'
import makeRequest from '../axios';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import displayINRCurrency from '../helpers/displayCurrency';
import UserContext from '../context';
import addToCart from '../helpers/addToCart';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const HorizontalProductCard = ({ category, heading }) => {

    // State to store product data
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const loadingList = new Array(13).fill(null);

    // Ref for scrolling container
    const scrollElement = useRef();
    const { fetchAddToCart } = useContext(UserContext);

    // Handle add to cart
    const handleAddToCart = async(e,id) => {
        await addToCart(e,id);
        fetchAddToCart();

    }

    // Fetch data from the API
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await makeRequest.get('/category-product', {params:{category}} );
            setData(res?.data.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }
    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div ref={scrollElement} className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all">
                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight /></button>

                {
                    isLoading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                    <div className='bg-bgRose h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                                    </div>
                                    <div className='p-4 grid w-full gap-2'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-bgRose animate-pulse p-1 rounded-full'></h2>
                                        <p className='capitalize text-slate-500 p-1 bg-bgRose animate-pulse rounded-full'></p>
                                        <div className='flex gap-3 w-full'>
                                            <p className='text-primaryColor font-medium p-1 bg-bgRose w-full animate-pulse rounded-full'></p>
                                            <p className='text-slate-500 line-through p-1 bg-bgRose w-full animate-pulse rounded-full'></p>
                                        </div>
                                        <button className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-bgRose animate-pulse'></button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        data.map((product, index) => {
                            return (
                                <Link to={`product/${product?._id}`} key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                    <div className="bg-slate-50 h-full p-4 min-w-[120px] md:min-w-[145px]">
                                        <img src={`${backendUrl}${product?.productImage[0]}`} className='object-scale-down h-full hover:scale-110 transition-all' />
                                    </div>

                                    <div className="p-4 grid">
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-primaryColor font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                        </div>
                                        <button onClick={(e)=>handleAddToCart(e,product?._id)} className='text-sm bg-primaryColor hover:bg-rose-600 text-white px-3 py-0.5 rounded-full'>Add to Cart</button>
                                    </div>
                                </Link>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default HorizontalProductCard