// External Imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Internal Imports
import apiRoutes from "./routes/index.js";
import connectDB from "./utils/db.js";
import { configInfo } from "./config/index.js";

// Internal configuration
const app = express();
dotenv.config();

// Other middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Allow Postman/Mobile Apps
      if (configInfo.allowedOrigins.includes(origin)) {
        callback(null, true); // Allow listed origins
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // For cookies or tokens
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Cache-Control",
    ], // Add Cache-Control
  })
);

// Add explicit OPTIONS handling
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.get("Origin"));
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Cache-Control"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204); // No content for preflight
});

app.use("/api", apiRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
});

connectDB()
  .then(() => {
    app.listen(configInfo.PORT, () =>
      console.log(`Server port: ${configInfo.PORT}`)
    );
  })
  .catch((err) => {
    process.exit(1);
  });
