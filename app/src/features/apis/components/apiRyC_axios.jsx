import React, { useEffect, useState } from "react";
import axios from "axios";

export const ApiRyCi = () => {
  const [Data, setData] = useState([]);
  const [Pages, setPages] = useState(1);
  const [Info, setInfo] = useState({});
  const [query, setQuery] = useState("");

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get(`https://rickandmortyapi.com/api/character`, {
        params: { page: Pages, name: query },
        cancelToken: source.token
      })
      .then(({ data }) => {
        setData(data.results || []);
        setInfo(data.info || {});
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;

        if (error.response?.status === 404) {
          setData([]);
          setInfo({});
          return;
        }

        console.error(error);
      });

    return () => source.cancel();
  }, [Pages, query]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "30px"
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "auto" }}>

        {/* HEADER */}
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ fontWeight: "bold" }}>
            Personajes Rick & Morty 👽
          </h2>
          <p style={{ color: "#6b7280" }}>
            Explora y descubre personajes fácilmente
          </p>
        </div>

        {/* SEARCH */}
        <div style={{ marginBottom: "25px" }}>
          <input
            type="text"
            placeholder="Buscar personaje..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPages(1);
            }}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              outline: "none"
            }}
          />
        </div>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px"
          }}
        >
          {Data.length === 0 ? (
            <p style={{ color: "#6b7280" }}>
              No se encontraron personajes
            </p>
          ) : (
            Data.map((char) => (
              <div
                key={char.id}
                style={{
                  background: "#fff",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                  transition: "0.3s"
                }}
              >
                <img
                  src={char.image}
                  alt={char.name}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover"
                  }}
                />

                <div style={{ padding: "15px" }}>
                  <h4 style={{ marginBottom: "5px" }}>
                    {char.name}
                  </h4>

                  <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                    {char.gender}
                  </p>

                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "4px 8px",
                      borderRadius: "6px",
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
                          : "#374151"
                    }}
                  >
                    {char.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINACIÓN */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            alignItems: "center"
          }}
        >
          <button
            onClick={() => setPages(Pages - 1)}
            disabled={!Info.prev}
            style={btnOutline}
          >
            ←
          </button>

          <span style={{ fontWeight: "bold" }}>
            {Pages}
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

/* BOTONES NUEVOS */

const btnOutline = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #111",
  background: "transparent",
  cursor: "pointer"
};

const btnDark = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "none",
  background: "#111",
  color: "#fff",
  cursor: "pointer"
};