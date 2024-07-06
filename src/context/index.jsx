import { createContext, useState, useEffect } from "react";
import makeRequest from "../axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  // Fetch user details from api
  const fetchUserDetails = async () => {
    try {
      const res = await makeRequest.get('/user-details');
      setUserDetails(res.data.data);
    } catch (error) {
      console.error('Failed to fetch user details ', error);
    }
  }

  useEffect(() => {
    // Fetch user details on mount
    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails, fetchUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
