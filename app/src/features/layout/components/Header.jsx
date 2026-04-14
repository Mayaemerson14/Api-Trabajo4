import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const links = [
    { to: "/", label: "Inicio", icon: "bi-house-door" },
    { to: "/ApiRyC", label: "Rick & Morty", icon: "bi-globe" },
    { to: "/ApiRyC_axios", label: "Axios API", icon: "bi-lightning" },
    { to: "/dashboard", label: "Gastos", icon: "bi-cash-stack" },
    { to: "/perfil", label: "Perfil", icon: "bi-person" },
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
          💸 GASTOS.APP
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