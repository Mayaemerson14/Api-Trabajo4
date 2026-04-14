import React from "react";
import { NavLink } from "react-router-dom";

export const Content = () => {
  // --- ESTILOS INTERNOS ---
  const linkStyle = {
    padding: "14px 20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.03)",
    textDecoration: "none",
    color: "#ccc",
    fontSize: "0.95rem",
    border: "1px solid rgba(255,255,255,0.05)",
    transition: "0.3s",
  };

  const bottomCard = {
    background: "#111",
    borderRadius: "24px",
    padding: "25px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.05)",
  };

  const btnWhite = {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 20px",
    background: "#fff",
    color: "#000",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "0.9rem"
  };

  const btnOutline = {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 20px",
    border: "1px solid #333",
    color: "#fff",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "0.9rem"
  };

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff" }}>
      
      {/* 1. SECCIÓN HERO */}
      <section className="p-4">
        <div style={{
            background: "linear-gradient(135deg, #1e1e1e 0%, #111111 100%)",
            borderRadius: "24px",
            padding: "40px",
            border: "1px solid rgba(255,255,255,0.05)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}>
          <span style={{ color: "#00f5d4", fontWeight: "600", fontSize: "0.8rem", letterSpacing: "1px" }}>
            DASHBOARD PRINCIPAL
          </span>
          <h1 style={{ fontWeight: "800", marginTop: "10px", fontSize: "2.2rem" }}>
            Gestiona tu capital <br /> con precisión.
          </h1>
          <NavLink to="/perfil" style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "12px 28px",
              background: "#00f5d4",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "12px",
              textDecoration: "none",
            }}>
            Mi Perfil
          </NavLink>
        </div>
      </section>

      {/* 2. GRID DE BALANCE Y ACCESOS */}
      <section className="px-4 pb-4">
        <div className="row g-4">
          
          <div className="col-md-7">
            <div style={{
                background: "#ffffff",
                color: "#000",
                borderRadius: "24px",
                padding: "30px",
                height: "100%",
              }}>
              <h6 style={{ color: "#666", fontWeight: "600" }}>BALANCE TOTAL</h6>
              <h2 style={{ fontSize: "2.8rem", fontWeight: "800", margin: "10px 0" }}>$1.300.000</h2>
              <span style={{ background: "#e6fffa", color: "#00a388", padding: "4px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "bold" }}>
                +12.5% este mes
              </span>
            </div>
          </div>

          <div className="col-md-5">
            <div style={{
                background: "#161616",
                borderRadius: "24px",
                padding: "25px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}>
              <h6 style={{ color: "#fff", marginBottom: "20px" }}>Accesos Directos</h6>
              <div className="d-flex flex-column gap-3">
                <NavLink to="/dashboard" style={linkStyle}>📊 Ver mis Gastos</NavLink>
                <NavLink to="/ApiRyC" style={linkStyle}>👽 API Rick & Morty</NavLink>
                <NavLink to="/ApiRyC_axios" style={linkStyle}>⚡ API con Axios</NavLink>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. HISTORIAL */}
      <section className="px-4 pb-4">
        <div style={{
            background: "#161616",
            borderRadius: "24px",
            padding: "30px",
            border: "1px solid rgba(255,255,255,0.05)",
          }}>
          <h5 className="mb-4">Historial de Movimientos</h5>
          <div className="d-flex flex-column gap-3">
            {[
              { name: "Supermercado", amount: "-$120.000", type: "out" },
              { name: "Salario Mensual", amount: "+$2.500.000", type: "in" },
              { name: "Transporte", amount: "-$30.000", type: "out" },
            ].map((item, i) => (
              <div key={i} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "15px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "16px",
                }}>
                <span style={{ fontWeight: "600" }}>{item.name}</span>
                <strong style={{ color: item.type === "in" ? "#00f5d4" : "#ff4d4d" }}>
                  {item.amount}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER CARDS */}
      <section className="p-4">
        <div className="row g-4">
          <div className="col-md-6">
             <div style={bottomCard}>
                <h6 className="text-secondary">¿Nuevo ingreso?</h6>
                <NavLink to="/register" style={btnWhite}>Registrar ahora</NavLink>
             </div>
          </div>
          <div className="col-md-6">
             <div style={bottomCard}>
                <h6 className="text-secondary">Código Fuente</h6>
                <a href="https://github.com/Mayaemerson14/Api-Trabajo4.git" target="_blank" rel="noreferrer" style={btnOutline}>GitHub Repo</a>
             </div>
          </div>
        </div>
      </section>

    </main>
  );
};