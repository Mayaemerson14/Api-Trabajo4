import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Perfil = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <main style={{ minHeight: "100vh", background: "#eef2f7", padding: "30px" }}>

      {/* HEADER */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontWeight: "bold", color: "#111" }}>
          Panel de Usuario
        </h2>
        <p style={{ color: "#6b7280" }}>
          Gestiona tu acceso y tu información personal
        </p>
      </div>

      {!user ? (
        <div className="row g-4">

          {/* LOGIN */}
          <div className="col-md-4">
            <div style={boxStyle}>
              <h5>Iniciar sesión</h5>
              <p style={textStyle}>
                Accede a tu cuenta existente
              </p>

              <NavLink to="/login" style={btnPrimary}>
                Entrar
              </NavLink>
            </div>
          </div>

          {/* REGISTER */}
          <div className="col-md-4">
            <div style={boxStyle}>
              <h5>Crear cuenta</h5>
              <p style={textStyle}>
                Regístrate para empezar
              </p>

              <NavLink to="/register" style={btnDark}>
                Registrarse
              </NavLink>
            </div>
          </div>

          {/* FORGOT */}
          <div className="col-md-4">
            <div style={boxStyle}>
              <h5>Recuperar acceso</h5>
              <p style={textStyle}>
                Restablece tu contraseña
              </p>

              <NavLink to="/forgotPassword" style={btnOutline}>
                Recuperar
              </NavLink>
            </div>
          </div>

        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div style={profileCard}>

            <div style={avatar}>
              {user.name?.charAt(0) || "U"}
            </div>

            <h4 style={{ marginTop: "15px" }}>
              {user.name || "Usuario"}
            </h4>

            <p style={{ color: "#6b7280" }}>
              {user.email}
            </p>

            <button onClick={logout} style={btnDanger}>
              Cerrar sesión
            </button>

          </div>
        </div>
      )}
    </main>
  );
};

/* ESTILOS TOTALMENTE NUEVOS */

const boxStyle = {
  background: "#ffffff",
  borderRadius: "12px",
  padding: "25px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
  height: "100%",
};

const profileCard = {
  background: "#ffffff",
  borderRadius: "15px",
  padding: "30px",
  width: "100%",
  maxWidth: "350px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const avatar = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  background: "#111",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.5rem",
  margin: "0 auto",
};

const textStyle = {
  color: "#6b7280",
  fontSize: "0.9rem",
  marginBottom: "15px",
};

const btnPrimary = {
  display: "inline-block",
  padding: "10px 15px",
  background: "#3b82f6",
  color: "#fff",
  borderRadius: "8px",
  textDecoration: "none",
};

const btnDark = {
  display: "inline-block",
  padding: "10px 15px",
  background: "#111",
  color: "#fff",
  borderRadius: "8px",
  textDecoration: "none",
};

const btnOutline = {
  display: "inline-block",
  padding: "10px 15px",
  border: "1px solid #111",
  color: "#111",
  borderRadius: "8px",
  textDecoration: "none",
};

const btnDanger = {
  marginTop: "15px",
  padding: "10px 15px",
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
};