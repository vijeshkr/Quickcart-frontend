import { createContext, useState, useEffect } from "react";
import makeRequest from "../axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [cartProductCount, setCartProductCount] = useState(0);

  // Fetch user details from api
  const fetchUserDetails = async () => {
    try {
      const res = await makeRequest.get('/user-details');
      setUserDetails(res.data.data);
    } catch (error) {
      console.error('Failed to fetch user details ', error);
    }
  }

  // Fetch Add to cart count api
  const fetchAddToCart = async() => {
    const dataResponse = await makeRequest.get('/countAddToCart');

    setCartProductCount(dataResponse?.data?.data?.count);
  }

  useEffect(() => {
    // Fetch user details on mount
    fetchUserDetails();

    // Fetch add to cart count
    fetchAddToCart();
  }, []);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails, fetchUserDetails,fetchAddToCart,cartProductCount,setCartProductCount }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
