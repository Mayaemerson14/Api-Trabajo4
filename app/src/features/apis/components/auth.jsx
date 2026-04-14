import axios from "axios";

// Cambiamos la URL de localhost a tu nueva URL de Vercel
const API_URL = "https://api-trabajo4.vercel.app";

export const registerUser = async (data) => {
  return await axios.post(`${API_URL}/api/auth/register`, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${API_URL}/api/auth/login`, data);
};

export const forgotPassword = async (data) => {
  return await axios.post(`${API_URL}/api/auth/forgot-password`, data);
};