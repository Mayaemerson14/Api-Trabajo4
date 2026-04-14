import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const links = [
    { to: "/", label: "Inicio", icon: "bi-grid-1x2-fill" }, // Icono de panel/inicio moderno
    { to: "/ApiRyC", label: "Rick & Morty", icon: "bi-alien" }, // Más temático para R&M
    { to: "/ApiRyC_axios", label: "Axios API", icon: "bi-cpu" }, // Representa procesamiento/datos
    { to: "/dashboard", label: "Gastos", icon: "bi-wallet2" }, // Icono de billetera para finanzas
    { to: "/perfil", label: "Perfil", icon: "bi-person-badge" }, // Icono de identificación personal
  ];

  return (
    <header style={{ backdropFilter: "blur(10px)" }}>
      <div
        className="d-flex justify-content-between align-items-center px-4 py-3"
        style={{
          background: "rgba(15,15,15,0.8)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* LOGO */}
        <NavLink
          to="/"
          style={{
            color: "#00f5d4",
            fontWeight: "bold",
            fontSize: "1.3rem",
            textDecoration: "none",
            letterSpacing: "2px",
          }}
        >
          🚀 FINANZAS.PRO
        </NavLink>

        {/* LINKS */}
        <div className="d-flex gap-3 align-items-center">
          {links.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className="d-flex align-items-center gap-2 px-3 py-2"
              style={({ isActive }) => ({
                textDecoration: "none",
                borderRadius: "12px",
                background: isActive
                  ? "linear-gradient(135deg, #00f5d4, #00bbf9)"
                  : "transparent",
                color: isActive ? "#000" : "#ddd",
                transition: "all 0.3s ease",
              })}
            >
              <i className={`bi ${item.icon}`}></i>
              <span style={{ fontSize: "0.9rem" }}>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};