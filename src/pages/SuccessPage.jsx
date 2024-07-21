import React, { useContext, useEffect } from 'react';
import makeRequest from '../axios';
import UserContext from '../context';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {

    const { fetchAddToCart } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPayment = async () => {
            const queryParams = new URLSearchParams(window.location.search);
            const sessionId = queryParams.get('session_id');

            if (sessionId) {
                try {
                    // Call server to handle successful payment
                    const response = await makeRequest.post('/order-success', { sessionId });
                    fetchAddToCart();
                    setTimeout(()=>{
                        navigate('/');
                    },5000)
                } catch (err) {
                    console.error('Error verifying payment:', err);

                }
            } else {
                setStatus('error');
                setError('No session ID found.');
            }
        };

        verifyPayment();
    }, []);


    return (
        <div className='container mx-auto h-96 flex justify-center items-center'>
            <div className='bg-green-200 p-5'>
                <h1 className='text-center text-2xl my-5'>Payment Successful</h1>
                <p className='text-center'>Thank you for your purchase!</p>
            </div>
        </div>
    );
};

export default SuccessPage;
