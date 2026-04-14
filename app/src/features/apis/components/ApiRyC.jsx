import React, { useEffect, useState } from "react";

export const ApiRyC = () => {
  const [Data, setData] = useState([]);
  const [Pages, setPages] = useState(1);
  const [Info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`https://rickandmortyapi.com/api/character?page=${Pages}`)
      .then((response) => response.json())
      .then((Data) => {
        setData(Data.results || []);
        setInfo(Data.info || {});
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [Pages]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "30px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "auto" }}>

        {/* HEADER */}
        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ fontWeight: "bold" }}>
            Explorador de personajes 🧪
          </h2>
          <p style={{ color: "#6b7280" }}>
            Navega entre páginas y descubre personajes
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div style={loaderContainer}>
            <div style={spinner}></div>
            <p style={{ marginTop: "10px", color: "#6b7280" }}>
              Cargando...
            </p>
          </div>
        )}

        {/* GRID */}
        {!loading && (
          <div style={grid}>
            {Data.length === 0 ? (
              <p style={{ color: "#6b7280" }}>
                No hay personajes disponibles
              </p>
            ) : (
              Data.map((char) => (
                <div key={char.id} style={card}>
                  
                  <img
                    src={char.image}
                    alt={char.name}
                    style={image}
                  />

                  <div style={{ padding: "12px" }}>
                    <h4 style={{ marginBottom: "5px" }}>
                      {char.name}
                    </h4>

                    <p style={subText}>
                      {char.gender}
                    </p>

                    <span
                      style={{
                        ...badge,
                        background:
                          char.status === "Alive"
                            ? "#dcfce7"
                            : char.status === "Dead"
                            ? "#fee2e2"
                            : "#e5e7eb",
                        color:
                          char.status === "Alive"
                            ? "#166534"
                            : char.status === "Dead"
                            ? "#991b1b"
                            : "#374151",
                      }}
                    >
                      {char.status}
                    </span>
                  </div>

                </div>
              ))
            )}
          </div>
        )}

        {/* PAGINACIÓN */}
        <div style={pagination}>
          <button
            onClick={() => setPages(Pages - 1)}
            disabled={!Info.prev}
            style={btnLight}
          >
            ←
          </button>

          <span style={{ fontWeight: "bold" }}>
            Página {Pages}
          </span>

          <button
            onClick={() => setPages(Pages + 1)}
            disabled={!Info.next}
            style={btnDark}
          >
            →
          </button>
        </div>

      </div>
    </main>
  );
};

/* ESTILOS NUEVOS */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "20px",
};

const card = {
  background: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
};

const image = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
};

const subText = {
  fontSize: "0.85rem",
  color: "#6b7280",
};

const badge = {
  fontSize: "0.75rem",
  padding: "4px 8px",
  borderRadius: "6px",
};

const pagination = {
  marginTop: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
};

const btnLight = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #111",
  background: "transparent",
  cursor: "pointer",
};

const btnDark = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "none",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
};

const loaderContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "50px",
};

const spinner = {
  width: "40px",
  height: "40px",
  border: "4px solid #e5e7eb",
  borderTop: "4px solid #111",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};