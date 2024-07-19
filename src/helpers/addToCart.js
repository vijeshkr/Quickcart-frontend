import { toast } from 'react-toastify';
import makeRequest from '../axios';

const addToCart = async (e,id) => {
    e?.stopPropagation();
    e?.preventDefault();

   try {
    const response = await makeRequest.post('/addtocart',{
    
            productId : id
    
    });
    toast.success(response.data.message);
   } catch (error) {
    console.log(error);
    toast.error(error.message);
   }

    
}

export default addToCart;