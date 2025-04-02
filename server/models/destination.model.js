// models/Destination.js
import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },

    shortInfo: {
      metatitle: {
        type: String,
      },
      idealTime: {
        type: String,
      },
      idealDuration: {
        type: String,
      },
      topAttraction: {
        type: String,
      },
      averagePrice: {
        type: String, // Let's make this string for now.
      },
    },

    // For knowing more about the destination package
    keywords: [String],
    description: {
      type: String,
      required: true,
    },
    shortPackageDesc: String,
    longPackageDesc: String, // Need to know how they're storing everything here
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

    // For Seo
    ogUrl: {
      type: String,
    },
    ogTitle: {
      type: String,
    },
    ogDescription: {
      type: String,
    },
    ogImageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Destination ||
  mongoose.model("Destination", destinationSchema);
