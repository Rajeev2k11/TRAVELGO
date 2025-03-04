const express = require("express");
const Location = require("../models/Destination"); // Import Destination model

const router = express.Router();

// Route to get all locations
router.get("/", async (req, res) => {
  try {
    const locations = await Location.find().maxTimeMS(5000);
   
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching locations", error });
  }
});

// Route to get a single location by ID
router.get("/top-destination", async (req, res) => {
  try {
    const topDestinations = await Location.find({ rating: { $gt: 4 } }).maxTimeMS(5000);
    
    res.status(200).json(topDestinations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching top destinations", error });
  }
});
// Route to search locations by name
router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "Please provide a search query" });
    }

    const searchResults = await Location.find({
      name: { $regex: name, $options: "i" } // Case-insensitive search
    }).maxTimeMS(5000);

    res.status(200).json(searchResults);
  } catch (error) {
    res.status(500).json({ message: "Error searching locations", error });
  }
});



module.exports = router;
