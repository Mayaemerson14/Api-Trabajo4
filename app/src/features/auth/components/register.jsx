import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/components/auth";

export const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 5;
    const numbers = password.replace(/[^0-9]/g, "").length >= 3;
    const specialChar = /[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password);
    return minLength && numbers && specialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(form.password)) {
      setError(
        "La contraseña debe tener mínimo 5 caracteres, 3 números y 1 carácter especial"
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await registerUser(form);

      setSuccess(res.data?.message || "Usuario registrado correctamente");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Error del servidor");
    } finally {
      setLoading(false);
    }
  };

  // indicador visual de seguridad
  const passwordStrength = form.password.length;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
          Crear cuenta
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.9rem",
            color: "#6b7280",
            marginBottom: "20px",
          }}
        >
          Regístrate para comenzar
        </p>

        {/* MENSAJES */}
        {error && (
          <div style={errorBox}>
            {error}
          </div>
        )}

        {success && (
          <div style={successBox}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <div style={field}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder=" "
              style={input}
            />
            <label style={label}>Nombre</label>
          </div>

          {/* EMAIL */}
          <div style={field}>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder=" "
              style={input}
            />
            <label style={label}>Correo</label>
          </div>

          {/* PASSWORD */}
          <div style={field}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder=" "
              style={input}
            />
            <label style={label}>Contraseña</label>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={eyeBtn}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* BARRA DE SEGURIDAD */}
          <div style={{ marginBottom: "15px" }}>
            <div
              style={{
                height: "6px",
                borderRadius: "5px",
                background: "#e5e7eb",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width:
                    passwordStrength < 5
                      ? "30%"
                      : passwordStrength < 8
                      ? "60%"
                      : "100%",
                  background:
                    passwordStrength < 5
                      ? "#ef4444"
                      : passwordStrength < 8
                      ? "#f59e0b"
                      : "#22c55e",
                  height: "100%",
                  transition: "0.3s",
                }}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} style={btn}>
            {loading ? "Creando..." : "Registrarse"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <Link to="/login" style={link}>
            Ya tengo cuenta
          </Link>
        </div>
      </div>
    </main>
  );
};

/* ESTILOS NUEVOS */

const field = {
  position: "relative",
  marginBottom: "20px",
};

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  outline: "none",
};

const label = {
  position: "absolute",
  top: "-8px",
  left: "10px",
  background: "#fff",
  fontSize: "0.75rem",
  padding: "0 5px",
  color: "#6b7280",
};

const eyeBtn = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  cursor: "pointer",
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
};

const link = {
  color: "#2563eb",
  fontSize: "0.85rem",
  textDecoration: "none",
};

const errorBox = {
  background: "#fee2e2",
  color: "#b91c1c",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "10px",
  textAlign: "center",
  fontSize: "0.85rem",
};

const successBox = {
  background: "#dcfce7",
  color: "#166534",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "10px",
  textAlign: "center",
  fontSize: "0.85rem",
};