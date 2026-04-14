import axios from "axios";

// Cambiamos la URL para que apunte a tu servidor local (puerto 3000)
const API_URL = "http://localhost:3000";

export const registerUser = async (data) => {
  // El return es necesario para que tu componente reciba la respuesta
  return await axios.post(`${API_URL}/api/auth/register`, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${API_URL}/api/auth/login`, data);
};

export const forgotPassword = async (data) => {
  return await axios.post(`${API_URL}/api/auth/forgot-password`, data);
};