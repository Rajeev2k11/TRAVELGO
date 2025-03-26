import mongoose from "mongoose";

const formDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,

      match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    contact: {
      type: String,
      required: true,
      trim: true,

      match: /^\d{10}$/,
    },
    message: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields
export default mongoose.model("Formdata", formDataSchema);
