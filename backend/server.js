const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/user");
const Gasto = require("./models/gasto");

const app = express();

// ================= MIDDLEWARE =================
// CORS abierto para permitir conexiones desde cualquier URL de Vercel
app.use(cors()); 
app.use(express.json());

// ================= CONFIG =================
const PORT = process.env.PORT || 4000;

// ================= CONEXIÓN MONGO =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 Mongo conectado exitosamente"))
  .catch((err) => console.log("🔴 Error de conexión en Mongo:", err));

// ================= AUTH MIDDLEWARE =================
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

// ================= AUTH ROUTES =================

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "Usuario registrado", user });
  } catch (error) {
    console.error("❌ Error en registro:", error);
    res.status(500).json({ message: "Error del servidor al registrar" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el login" });
  }
});

// ================= GASTOS ROUTES =================

app.post("/api/gastos", auth, async (req, res) => {
  try {
    const gasto = await Gasto.create({
      ...req.body,
      usuario: req.usuario,
    });
    res.status(201).json(gasto);
  } catch (error) {
    res.status(500).json({ message: "Error al guardar gasto" });
  }
});

app.get("/api/gastos", auth, async (req, res) => {
  try {
    const gastos = await Gasto.find({ usuario: req.usuario }).sort({
      createdAt: -1,
    });
    res.json(gastos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener gastos" });
  }
});

app.delete("/api/gastos/:id", auth, async (req, res) => {
  try {
    const gasto = await Gasto.findByIdAndDelete(req.params.id);
    if (!gasto) return res.status(404).json({ message: "Gasto no encontrado" });
    res.json({ message: "Gasto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar" });
  }
});

app.put("/api/gastos/:id", auth, async (req, res) => {
  try {
    const gasto = await Gasto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!gasto) return res.status(404).json({ message: "Gasto no encontrado" });
    res.json(gasto);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar" });
  }
});

// Ruta de prueba para verificar que el backend responde en Vercel
app.get("/", (req, res) => {
  res.send("Servidor de GastosApp funcionando 🚀");
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en el puerto ${PORT}`);
});