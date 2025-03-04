const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const cors = require("cors")
const app = express();

const destinationRoutes = require("./routes/DestinationRoute");
const packageRoutes = require("./routes/PackageRoute");
const formdataRoutes = require("./routes/FormData")

dotenv.config()

// Log the MongoDB URL (with password hidden)
const mongoUrl = process.env.MONGO_URL;
console.log('MongoDB URL:', mongoUrl.replace(/:([^@]+)@/, ':****@'));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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

app.use(express.json());
app.use(cors());
app.use(express.static('public'));



const PORT = 5001;

app.use("/api/locations", destinationRoutes);

app.use("/api/packages", packageRoutes);
app.use("/api/formdata", formdataRoutes);

app.listen(PORT, () => console.log(`Server port: ${PORT}`));
