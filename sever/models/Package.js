const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true }
});

const durationSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  night: { type: Number, required: true }
});

const packageSchema = new mongoose.Schema({
  id: { type: Number } ,
  package_name: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: durationSchema, required: true },
  package_description: { type: String, required: true },
  price: { type: Number, required: true },
  itinerary: [itinerarySchema],
  inclusions: [{ type: String, required: true }],
  images: [{ type: String, required: true }],
  theme: { type: String, required: true },
  rating: { type: Number, required: true }
}, { timestamps: true,
  collection: 'package',
 });


const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
