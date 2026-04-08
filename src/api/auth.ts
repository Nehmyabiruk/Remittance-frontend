import axios from "axios";

const API = axios.create({
  baseURL: "https://remittance-backend-tkl6.onrender.com/api/auth",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const registerUser = (data: any) => API.post("/register", data);
export const loginUser = (data: any) => API.post("/login", data);
