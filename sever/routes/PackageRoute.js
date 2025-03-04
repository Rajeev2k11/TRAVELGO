const express = require("express");
const Package = require("../models/Package");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("Querying collection:", Package.collection.name);
    
    const packages = await Package.find().lean();
    console.log("Found packages:", packages.length);

    if (!packages || packages.length === 0) {
      return res.status(404).json({ 
        message: "No packages found",
        databaseState: mongoose.connection.readyState,
        collectionName: Package.collection.name
      });
    }
    
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ 
      message: "Error fetching packages", 
      error: error.message
    });
  }
});

module.exports = router;