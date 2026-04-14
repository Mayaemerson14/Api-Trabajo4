import axios from "axios";

// URL de tu Backend en Vercel
const API_URL = "https://api-trabajo4.vercel.app";

// Configuración del Token para rutas protegidas
const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

/**
 * 📊 OBTENER TODOS LOS GASTOS
 */
export const getGastos = () =>
  axios.get(`${API_URL}/api/gastos`, getToken());

/**
 * ➕ CREAR UN NUEVO GASTO
 */
export const createGasto = (data) =>
  axios.post(`${API_URL}/api/gastos`, data, getToken());

/**
 * 🗑 ELIMINAR UN GASTO POR ID
 */
export const deleteGasto = (id) =>
  axios.delete(`${API_URL}/api/gastos/${id}`, getToken());

/**
 * ✏️ EDITAR UN GASTO EXISTENTE
 */
export const updateGasto = (id, data) =>
  axios.put(`${API_URL}/api/gastos/${id}`, data, getToken());