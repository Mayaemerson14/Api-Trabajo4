import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../apis/components/auth";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await forgotPassword({ email });

      setSuccess(res.data?.message || "Correo enviado correctamente");
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
        background: "#f1f5f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* TITLE */}
        <h2
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Recuperar acceso
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.9rem",
            color: "#6b7280",
            marginBottom: "20px",
          }}
        >
          Ingresa tu correo y te enviaremos instrucciones
        </p>

        {/* MENSAJES */}
        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#b91c1c",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
              fontSize: "0.85rem",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
              fontSize: "0.85rem",
              textAlign: "center",
            }}
          >
            {success}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "0.85rem", color: "#374151" }}>
              Correo electrónico
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>

        {/* LINK */}
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <Link
            to="/login"
            style={{
              fontSize: "0.85rem",
              color: "#2563eb",
              textDecoration: "none",
            }}
          >
            Volver al login
          </Link>
        </div>
      </div>
    </main>
  );
};