const mongoose = require("mongoose");

const gastoSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true
  },
  usuario: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},
  monto: {
    type: Number,
    required: true
  },
  categoria: String,
  fecha: String,
  metodo: String,
  notas: String,
  icono: String
}, {
  timestamps: true
});

module.exports = mongoose.model("Gasto", gastoSchema);