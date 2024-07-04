import axios from 'axios';

// Axios instance with baseUrl
const makeRequest = axios.create({
    baseURL:'http://localhost:3500/api/',
    withCredentials: true,
});

export default makeRequest;