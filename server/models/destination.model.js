// models/Destination.js
import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    metatitle: String,
    idealTime: {
      type: String,
      default: null,
    },
    idealDuration: {
      type: String,
      default: null,
    },
    priceStarts: {
      type: String,
      default: null,
    },
    bestAttraction: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      required: true,
    },
    keywords: [String],
    shortPackageDesc: String,
    longPackageDesc: String,
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
    status: {
      type: Number,
      default: 1,
    },
    insertDate: {
      type: Date,
      default: Date.now,
    },
    updateDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Destination ||
  mongoose.model("Destination", destinationSchema);
