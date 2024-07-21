import React, { useContext, useEffect, useState } from 'react';
import makeRequest from '../axios';
import { MdDelete } from "react-icons/md";
import displayINRCurrency from '../helpers/displayCurrency';
import UserContext from '../context';
import { loadStripe } from '@stripe/stripe-js';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const loadingCart = new Array(4).fill(null);

    const{ fetchAddToCart } = useContext(UserContext);

    const fetchData = async () => {
        try {
            const res = await makeRequest.get('/addtocart-products');

            setData(res.data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleLoading = async () => {
        await fetchData();
    }

    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [data]);

    const increaseQty = async (id,qty) => {
        const response = await makeRequest.post('/update-cart',{
            _id : id,
            quantity : qty + 1
        });
        if(response){
            fetchData();
        }
    }

    const decreaseQty = async (id,qty) => {
        if(qty >= 2){
            const response = await makeRequest.post('/update-cart',{
                _id : id,
                quantity : qty -1
            });

            if(response){
                fetchData();
            }
        }
    }

    const deleteCartProduct = async (id) => {
        try {
            const response = await makeRequest.post('/delete-cart-product',{
                _id : id
            });

            if(response){
                fetchData();
                fetchAddToCart();
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0);
    const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0);


    // Payment integration handle checkout section
    const handleCheckout = async () => {
        try {
            const response = await makeRequest.post('/checkout', {
                cartItems: data,
            });
            const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
            
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId: response.data.id });

        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <div className='container mx-auto'>
        
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>   
                {/***view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el,index) => {
                                return(
                                    <div key={index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })
                             
                        ) : (
                          data.map((product,index)=>{
                           return(
                            <div key={index} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img src={`${backendUrl}${product?.productId?.productImage[0]}`} className='w-full h-full object-scale-down mix-blend-multiply' />
                                </div>
                                <div className='px-4 py-2 relative'>
                                    {/**delete product */}
                                    <div onClick={()=>deleteCartProduct(product?._id)} className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer'>
                                        <MdDelete/>
                                    </div>

                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                    <div className='flex items-center justify-between'>
                                            <p className='text-primaryColor font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice  * product?.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                        <span>{product?.quantity}</span>
                                        <button className='border border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                    </div>
                                </div>    
                            </div>
                           )
                          })
                        )
                    }
                </div>


                {/***summary  */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                
                            </div>
                            ) : ( data[0] &&
                                <div className='h-36 bg-white'>
                                    <h2 className='text-white bg-primaryColor px-4 py-1'>Summary</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity</p>
                                        <p>{totalQty}</p>
                                    </div>

                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price</p>
                                        <p>{displayINRCurrency(totalPrice)}</p>    
                                    </div>

                                    <button onClick={handleCheckout} className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>

                                </div>
                            )
                        }
                </div>
        </div>
    </div>
    )
}

export default Cart