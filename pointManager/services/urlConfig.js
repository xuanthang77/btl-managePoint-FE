import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const https = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { "Content-Type": "multipart/form-data" },
});
const httpsApp = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { "Content-Type": "application/json" },
});

// Thêm interceptor để thêm tiêu đề Authorization nếu tồn tại
// https.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem("access_token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export { https, httpsApp };
