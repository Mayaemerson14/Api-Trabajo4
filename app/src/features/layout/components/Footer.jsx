import React from "react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        marginTop: "auto",
      }}
    >
      <div className="container py-5">

        {/* BLOQUE PRINCIPAL */}
        <div
          className="p-4 mb-4"
          style={{
            borderRadius: "20px",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="row g-4 align-items-center">

            {/* MARCA */}
            <div className="col-md-4 text-center text-md-start">
              <h3 style={{ fontWeight: "bold", color: "#00f5d4" }}>
                💸 GastosApp
              </h3>
              <p className="text-secondary small">
                Controla tu dinero con una experiencia moderna y eficiente.
              </p>
            </div>

            {/* NAVEGACIÓN (Actualizada sin "Conócenos") */}
            <div className="col-md-4 text-center">
              <div className="d-flex flex-wrap justify-content-center gap-3">

                {[
                  { to: "/", label: "Inicio" },
                  { to: "/dashboard", label: "Gastos" },
                  { to: "/perfil", label: "Perfil" },
                ].map((item, i) => (
                  <NavLink
                    key={i}
                    to={item.to}
                    style={({ isActive }) => ({
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      color: isActive ? "#00f5d4" : "#aaa",
                      transition: "0.3s",
                    })}
                  >
                    {item.label}
                  </NavLink>
                ))}

              </div>
            </div>

            {/* CONTACTO */}
            <div className="col-md-4 text-center text-md-end">
              <p className="text-secondary small mb-1">
                soporte@gastosapp.com
              </p>
              <p className="text-secondary small">Colombia</p>

              <NavLink
                to="/register"
                className="btn mt-2 px-3 py-1"
                style={{
                  background: "#00f5d4",
                  color: "#000",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                }}
              >
                Empezar
              </NavLink>
            </div>

          </div>
        </div>

        {/* REDES */}
        <div className="text-center mb-3">
          <div className="d-flex justify-content-center gap-4">

            {["facebook", "instagram", "twitter-x", "github"].map((icon, i) => (
              <a
                key={i}
                href="#"
                style={{
                  color: "#888",
                  fontSize: "1.2rem",
                  transition: "0.3s",
                }}
              >
                <i className={`bi bi-${icon}`}></i>
              </a>
            ))}

          </div>
        </div>

        {/* BOTTOM */}
        <div className="text-center text-secondary small">
          <p className="mb-1">© 2026 GastosApp</p>

          <div className="d-flex justify-content-center gap-3">
            <span style={{ cursor: "pointer" }}>Privacidad</span>
            <span style={{ cursor: "pointer" }}>Términos</span>
          </div>
        </div>

      </div>
    </footer>
  );
};