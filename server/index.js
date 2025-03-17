const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const destinationRoutes = require("./routes/DestinationRoute");
const packageRoutes = require("./routes/PackageRoute");
const formdataRoutes = require("./routes/FormData");

dotenv.config();

// Define allowed origins BEFORE using them in cors configuration
const allowedOrigins = [
  'http://localhost:3000',         // Development
  'https://travelgo-frontend-lemon.vercel.app', // Production
  'http://localhost:5001'
];

// Configure CORS properly BEFORE using any other middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block other origins
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // For cookies or tokens
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Add explicit OPTIONS handling
app.options('*', cors());

// Other middleware
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log('Connected to MongoDB');
  console.log('Database:', mongoose.connection.db.databaseName);
  
  // List all collections and their document counts
  const collections = await mongoose.connection.db.listCollections().toArray();
  for (const collection of collections) {
    const count = await mongoose.connection.db
      .collection(collection.name)
      .countDocuments();
    console.log(`Collection ${collection.name}: ${count} documents`);
  }
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use("/api/locations", destinationRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/formdata", formdataRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server port: ${PORT}`));