import mongoose, { Schema } from "mongoose";
// Definir un modelo
const categorySchema = new Schema({
  name: { type: String, maxLength: 50, unique: true, required: true },
  description: { type: String, maxLength: 255 },
  status: { type: Number, default: 1 },
  create_at: { type: Date, default: Date.now },
});
// Convertimos la variable en un modelo , basandose en el schema ya creado
const Category = mongoose.model("category", categorySchema);

// Exportamos el modelo
export default Category;
