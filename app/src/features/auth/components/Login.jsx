import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/components/auth";

export const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Error del servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f9fafb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "#ffffff",
          borderRadius: "14px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* TITULO */}
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
          Bienvenido 👋
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.9rem",
            color: "#6b7280",
            marginBottom: "20px",
          }}
        >
          Inicia sesión para continuar
        </p>

        {/* ERROR */}
        {error && (
          <div style={errorBox}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div style={field}>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Correo electrónico"
              style={input}
            />
          </div>

          {/* PASSWORD */}
          <div style={field}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Contraseña"
              style={input}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={eyeBtn}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* BOTON */}
          <button type="submit" disabled={loading} style={btn}>
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>

        {/* LINKS */}
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.85rem",
          }}
        >
          <Link to="/register" style={link}>
            Crear cuenta
          </Link>

          <Link to="/forgotPassword" style={link}>
            ¿Olvidaste?
          </Link>
        </div>
      </div>
    </main>
  );
};

/* ESTILOS NUEVOS */

const field = {
  position: "relative",
  marginBottom: "15px",
};

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  outline: "none",
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
  marginTop: "10px",
};

const link = {
  color: "#2563eb",
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