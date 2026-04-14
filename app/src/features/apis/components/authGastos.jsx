import axios from "axios";

const API_URL = "https://api-de-gastos.onrender.com";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// 📊 OBTENER
export const getGastos = () =>
  axios.get(`${API_URL}/api/gastos`, getToken());

// ➕ CREAR
export const createGasto = (data) =>
  axios.post(`${API_URL}/api/gastos`, data, getToken());

// 🗑 ELIMINAR
export const deleteGasto = (id) =>
  axios.delete(`${API_URL}/api/gastos/${id}`, getToken());

// ✏️ EDITAR
export const updateGasto = (id, data) =>
  axios.put(`${API_URL}/api/gastos/${id}`, data, getToken());