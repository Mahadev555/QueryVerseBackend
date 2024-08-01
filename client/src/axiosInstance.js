// Create a file named axiosInstance.js or any other appropriate name
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'https://query-z4fe.onrender.com/' // You can use environment variables to override this
});

export default instance;
