import axios from "axios";

const https = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    "Content-type": "application/json"
  }
});

https.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default https;

/*export default axios.create({
  baseURL: "http://localhost:5001",
  //baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  }
});*/