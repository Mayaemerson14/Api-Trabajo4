import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getGastos, createGasto, deleteGasto, updateGasto } from "../../apis/components/authGastos";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Dashboard = () => {

  const [form, setForm] = useState({
    descripcion: "",
    monto: "",
    categoria: "",
    fecha: "",
    metodo: "",
    notas: "",
    icono: "bi-cash"
  });

  const [gastos, setGastos] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuth(false);
      setLoading(false);
      return;
    }

    setIsAuth(true);
    cargarGastos();
  }, []);

  const cargarGastos = async () => {
    try {
      const res = await getGastos();
      setGastos(res.data);
    } catch {
      console.log("Error cargando gastos");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validar = () => {
    let nuevosErrores = {};

    if (!form.descripcion.trim()) nuevosErrores.descripcion = "Requerido";
    if (!form.monto || Number(form.monto) <= 0) nuevosErrores.monto = "Inválido";
    if (!form.categoria) nuevosErrores.categoria = "Requerido";
    if (!form.fecha) nuevosErrores.fecha = "Requerido";
    if (!form.metodo) nuevosErrores.metodo = "Requerido";

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    try {
      const res = await createGasto(form);
      setGastos([res.data, ...gastos]);

      setForm({
        descripcion: "",
        monto: "",
        categoria: "",
        fecha: "",
        metodo: "",
        notas: "",
        icono: "bi-cash"
      });

      setErrors({});
    } catch {
      console.log("Error");
    }
  };

  const eliminarGasto = async (id) => {
    await deleteGasto(id);
    setGastos(gastos.filter(g => g._id !== id));
  };

  const editarGasto = async (gasto) => {
    const desc = prompt("Editar descripción", gasto.descripcion);
    const monto = prompt("Editar monto", gasto.monto);

    if (!desc || !monto) return;

    const res = await updateGasto(gasto._id, {
      descripcion: desc,
      monto: Number(monto)
    });

    setGastos(gastos.map(g => g._id === gasto._id ? res.data : g));
  };

  const total = gastos.reduce((acc, g) => acc + Number(g.monto), 0);

  const chartData = {
    labels: gastos.map(g => g.descripcion),
    datasets: [
      {
        label: "Gastos",
        data: gastos.map(g => g.monto),
        backgroundColor: "#4f46e5"
      }
    ]
  };

  if (!loading && !isAuth) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="p-5 rounded bg-dark text-white text-center">
          <h3>Acceso denegado</h3>
        </div>
      </div>
    );
  }

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "#fff" }}>
      <div className="container py-4">

        {/* HEADER */}
        <div className="mb-4">
          <h2 className="fw-bold">📊 Panel Financiero</h2>
          <p className="text-secondary">Control total de tus gastos</p>
        </div>

        {/* TOTAL CARD */}
        <div
          className="p-4 mb-4"
          style={{
            borderRadius: "20px",
            background: "linear-gradient(135deg,#4f46e5,#9333ea)"
          }}
        >
          <h5>Total gastado</h5>
          <h1>${total}</h1>
        </div>

        <div className="row">

          {/* FORM */}
          <div className="col-md-4">
            <div className="p-4 bg-dark rounded-4">
              <h5 className="mb-3">Nuevo gasto</h5>

              <form onSubmit={handleSubmit}>
                <input name="descripcion" value={form.descripcion} onChange={handleChange} className="form-control mb-2" placeholder="Descripción"/>
                <input name="monto" type="number" value={form.monto} onChange={handleChange} className="form-control mb-2" placeholder="Monto"/>

                <select name="categoria" value={form.categoria} onChange={handleChange} className="form-control mb-2">
                  <option value="">Categoría</option>
                  <option>Comida</option>
                  <option>Transporte</option>
                </select>

                <input type="date" name="fecha" value={form.fecha} onChange={handleChange} className="form-control mb-2"/>

                <select name="metodo" value={form.metodo} onChange={handleChange} className="form-control mb-2">
                  <option value="">Método</option>
                  <option>Efectivo</option>
                  <option>Tarjeta</option>
                </select>

                <textarea name="notas" value={form.notas} onChange={handleChange} className="form-control mb-3" placeholder="Notas"/>

                <button className="btn btn-primary w-100">Guardar</button>
              </form>
            </div>
          </div>

          {/* LIST */}
          <div className="col-md-8">
            <div className="p-4 bg-dark rounded-4">

              <div className="d-flex justify-content-between mb-3">
                <h5>Historial</h5>
                <button className="btn btn-outline-light" onClick={() => setShowChart(!showChart)}>
                  📊
                </button>
              </div>

              {gastos.map(g => (
                <div
                  key={g._id}
                  className="p-3 mb-2"
                  style={{
                    background: "#1e293b",
                    borderRadius: "12px"
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <strong>{g.descripcion}</strong>
                    <span>${g.monto}</span>
                  </div>

                  <small className="text-secondary">
                    {g.categoria} • {g.metodo}
                  </small>

                  <div className="mt-2 d-flex gap-2">
                    <button className="btn btn-sm btn-warning" onClick={() => editarGasto(g)}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={() => eliminarGasto(g._id)}>Eliminar</button>
                  </div>
                </div>
              ))}

              {showChart && (
                <div className="mt-4">
                  <Bar data={chartData} />
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};