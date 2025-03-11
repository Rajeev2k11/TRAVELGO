const mongoose = require('mongoose');

// Define the About schema
const aboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  places: [{ type: String, required: true }], // Array of place names
  activities: [{ type: String, required: true }] // Array of activities
});

// Define the main Location schema
const locationSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  name: { type: String, required: true },
  avg_price: { type: Number, required: true },
  top_attraction: { type: String, required: true },
  images: [{ type: String, required: true }], // Array of image URLs
  about: { type: aboutSchema, required: true } // Nested About schema
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
