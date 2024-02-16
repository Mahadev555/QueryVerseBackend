// Create a file named axiosInstance.js or any other appropriate name
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:8080' // You can use environment variables to override this
});

export default instance;
