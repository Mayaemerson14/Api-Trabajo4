import { useState } from "react";
import { loginUser, registerUser, forgotPassword } from "../../apis/components/auth";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const res = await loginUser(data);

      // guardar token si existe
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const res = await registerUser(data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  const recoverPassword = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const res = await forgotPassword(data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al enviar correo");
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    recoverPassword,
    loading,
    error,
  };
};