import axios from "axios";
import { environment } from "./constant";

// Khởi tạo một Axios instance
const customAxios = axios.create({
  baseURL: "http://localhost:5000",
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm một interceptor request để lấy token từ localStorage và gắn vào header
customAxios.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const accessToken = localStorage.getItem(
      environment.REACT_APP_LOCAL_STORE_TOKEN_NAME
    );
    // Gắn token vào header của mỗi request
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    const responseData = response.data;
    return responseData;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
