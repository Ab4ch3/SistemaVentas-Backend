import mongoose, { Schema } from "mongoose";

const articleSchema = new Schema({
  category: { type: Schema.ObjectId, ref: "category" },
  code: { type: String, maxLength: 64 },
  name: { type: String, maxLength: 64, unique: true, required: true },
  description: { type: String, maxLength: 255 },
  sell_price: { type: Number, required: true },
  stock: { type: Number, required: true },
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
});

const Article = mongoose.model("article", articleSchema);

export default Article;
