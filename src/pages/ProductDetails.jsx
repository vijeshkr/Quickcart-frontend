import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import makeRequest from '../axios';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import UserContext from '../context/index';
import addToCart from '../helpers/addToCart';
import VerticalProductCard from '../components/VerticalProductCard';

const ProductDetails = () => {

    // State to store product details
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });

    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const productImageListLoading = new Array(4).fill(null);
    const [activeImage, setActiveImage] = useState('');

    const navigate = useNavigate();

    // Function to fetch product details from the API
    const fetchProductDetails = async () => {
        setIsLoading(true);
        const res = await makeRequest.post('/product-details', {
            productId: params?.id
        });
        setData(res?.data?.data);
        setActiveImage(res?.data?.data?.productImage[0]);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchProductDetails()
    }, [params]);

    // Handle mouse enter event to change the active product image
    const handleMouseEnterProduct = (imageURL) => {
        setActiveImage(imageURL)
    }

    // State to manage coordinates for image zoom
    const [zoomImageCordinate, setZoomImageCordinate] = useState({
        x: 0,
        y: 0
    });

    // State to manage zoom image status
    const [zoomImage, setZoomImage] = useState(false);

    // Handle image zoom on mouse move event
    const handleZoomImage = useCallback((e) => {
        setZoomImage(true);
        const { left, top, width, height } = e.target.getBoundingClientRect();

        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setZoomImageCordinate({
            x,
            y
        })
    },
        [zoomImageCordinate]
    );
    const handleLeaveImageZoom = () => {
        setZoomImage(false)
    }

    const { fetchAddToCart } = useContext(UserContext);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchAddToCart();

    }

    // Handle buy now button click
    const handleBuyProduct = async (e, id) => {
        await addToCart(e, id);
        fetchAddToCart();
        navigate("/cart");

    }

    return (
        <div className='container mx-auto p-4'>
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                {/* Product image */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                    <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                        <img src={`http://localhost:3500${activeImage}`} onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} className='h-full w-full object-scale-down mix-blend-multiply' />
                        {/* Zoom */}
                        {
                            zoomImage && (
                                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                                    <div
                                        className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                                        style={{
                                            background: `url(http://localhost:3500${activeImage})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: `${zoomImageCordinate.x * 100}% ${zoomImageCordinate.y * 100}% `

                                        }}
                                    >

                                    </div>
                                </div>
                            )
                        }
                    </div>

                    <div className='h-full'>
                        {
                            isLoading ? (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        productImageListLoading.map((image, index) => {
                                            return (
                                                <div key={index} className='h-20 w-20 bg-slate-200 rounded animate-pulse' >

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        data?.productImage?.map((imgUrl, index) => {
                                            return (
                                                <div className='h-20 w-20 bg-slate-200 rounded p-1' key={index}>
                                                    <img src={`http://localhost:3500${imgUrl}`} onClick={() => handleMouseEnterProduct(imgUrl)} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>

                </div>

                {/* Product details */}
                {
                    isLoading ? (
                        <div className='grid gap-1 w-full'>
                            <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
                            <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
                            <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

                            <div className='text-primaryColor bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>

                            </div>

                            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                                <p className='text-primaryColor bg-slate-200 w-full'></p>
                                <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
                            </div>

                            <div className='flex items-center gap-3 my-2 w-full'>
                                <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                                <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                            </div>

                            <div className='w-full'>
                                <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
                                <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-1'>
                            <p>{data?.brandName}</p>
                            <h2>{data?.productName}</h2>
                            <p>{data?.category}</p>

                            <div className='text-primaryColor flex items-center gap-1'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalf />
                            </div>

                            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                                <p className='text-primaryColor'>{displayINRCurrency(data?.sellingPrice)}</p>
                                <p className='text-slate-400 line-through'>{displayINRCurrency(data?.price)}</p>
                            </div>

                            <div className='flex items-center gap-3 my-2'>
                                <button onClick={(e) => handleBuyProduct(e, data?._id)} className='border-2 border-primaryColor rounded px-3 py-1 min-w-[120px] text-primaryColor font-medium hover:bg-primaryColor hover:text-white'>Buy</button>
                                <button onClick={(e) => handleAddToCart(e, data?._id)} n className='border-2 border-primaryColor rounded px-3 py-1 min-w-[120px] font-medium text-white bg-primaryColor hover:text-primaryColor hover:bg-white'>Add to cart</button>
                            </div>

                            <div>
                                <p className='text-slate-600 font-medium my-1'>Description : </p>
                                <p>{data?.description}</p>
                            </div>
                        </div>
                    )
                }
            </div>
            {/* Product suggessions */}
            {
                data.category && (
                    <VerticalProductCard category={data?.category} heading={"Recommended Product"} />
                )
            }
        </div>
    )
}

export default ProductDetails;