const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const destinationRoutes = require("../routes/DestinationRoute");
const packageRoutes = require("../routes/PackageRoute");
const formdataRoutes = require("../routes/FormData");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Define API routes
app.use("/api/locations", destinationRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/formdata", formdataRoutes);

// Export as a Vercel function
module.exports = app;
