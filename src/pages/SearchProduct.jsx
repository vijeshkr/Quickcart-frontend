import React, { useEffect, useState } from 'react';
import makeRequest from '../axios';
import {useLocation} from 'react-router-dom';
import LoadingComponent from '../components/Loading';
import VerticalCard from '../components/VerticalCard';

const SearchProduct = () => {

    const query = useLocation();
    const [ data, setData ] = useState([]);
    const [loading,setLoading] = useState(false);
    

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await makeRequest.get('/search'+query.search);
            setData(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=> {
        fetchProduct();
    },[query]);
  return (
    <div className='container mx-3 sm:mx-auto'>
        {
            loading && (
                <LoadingComponent/>
            )
        }
         <p className='text-lg font-semibold my-3 sm:mx-14 text-center sm:text-left'>Search Results : {data.length}</p>

{
  data.length === 0 && !loading && (
     <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
  )
}


{
  data.length !==0 && !loading && (
    <VerticalCard loading={ loading} data={data}/>
  )
}
    </div>
  )
}

export default SearchProduct