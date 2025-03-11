const express = require("express");
const Contact = require("../models/Formdata");

const router = express.Router();

// ✅ POST Request - Add new contact form data
router.post("/", async (req, res) => {
    try {
      console.log("Received data:", req.body);
      const newContact = new Contact(req.body);
      await newContact.save();
      console.log("Saved data successfully!");
      res.status(201).json({ message: "Contact saved successfully", data: newContact });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(400).json({ error: error.message });
    }
  });

// ✅ GET Request - Fetch all contact form data
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
