const mongoose = require("mongoose");

const formDataSchema = new mongoose.Schema({
   
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, // Email validation regex
  },
  contact: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\d{10}$/, // Ensures exactly 10-digit phone number
  },
  message: {
    type: String,
    required: false,
    trim: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model("Formdata", formDataSchema);

