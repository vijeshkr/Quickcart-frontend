import React, { useEffect, useState } from 'react';
import makeRequest from '../axios';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const OrderHistoryAdmin = () => {
    const [orders, setOrders] = useState([]);
    const fetchOrders = async () => {
        const response = await makeRequest.get(`/order-history-admin`);
        setOrders(response.data.data.reverse());
    }
    useEffect(() => {
        fetchOrders();
    }, []);
    return (
        <div className='container mx-auto'>
            <h1 className='text-center text-2xl my-5'>Order History</h1>
            {orders.map((order, index) => (
                <div>
                    <p className='font-semibold text-xl p-2'>{moment(order.paidAt).format('MMMM DD, YYYY')}</p>
                    <div key={order._id} className='bg-white p-6 mb-5 shadow-md flex flex-row-reverse justify-between'>
                        <div className='text-sm flex flex-col gap-1'>
                            <h2>Order {order._id}</h2>
                            <p>Total Price: {displayINRCurrency(order.totalPrice)}</p>
                            <p>Paid: {order.isPaid ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            {order.orderItems.map(item => (
                                <div className='flex flex-col gap-2' key={item._id}>
                                    <img className='h-28 object-contain' src={`${backendUrl}${item.productId.productImage[0]}`} alt="" />
                                    <p className='font-semibold'>{item.name} - {item.qty} - {displayINRCurrency( item.price)}</p>
                                </div>

                            ))}
                        </div>
                    </div>

                </div>))}
        </div>
    );
};

export default OrderHistoryAdmin;
