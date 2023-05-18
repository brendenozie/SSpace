import mongoose from "mongoose";
const ProductCategorySchema = new mongoose.Schema(
  {
    pcName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProductCategories", ProductCategorySchema);
