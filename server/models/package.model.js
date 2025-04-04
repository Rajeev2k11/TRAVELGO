// Mongoose Schema
import mongoose from "mongoose";

const itenarySchema = new mongoose.Schema({
  listItem: {
    type: String,
  },
  todo: {
    type: [String],
  },
});

const TourPackageSchema = new mongoose.Schema(
  {
    // Primary Details
    /////////////////////////////////
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 50,
      maxlength: 2000,
    },

    ///////////////////////////////////
    // Categorizing and Filtering
    ///////////////////////////////////
    relateKey: {
      type: String,
      default: "Europe",
      required: true, // This is for relate Key for searching, Example: Himachal then
    },
    keywords: {
      type: [String],
      default: "",
    },
    destinationSearch: {
      type: [String], // Do state of district based destination search
      required: true,
    },
    tourType: {
      type: String,
      enum: ["Group", "Couple", "Family", "Single"],
      default: "Group",
    },

    tabs: {
      itenary: [itenarySchema],
      inclusions: [String],
      thingsToDo: [String],
      timeToVisit: {
        overview: String, // A little overview
        season: [
          /**
           * This would do something like this
           *
           * Winter
           * nice and cold weather to do this
           *
           * Summer
           * nisdkfjhdslfkkhdsjfkdsljkfjhjdsfj
           */
          {
            name: String,
            about: String,
          },
        ],
      },
    },

    landscapeType: {
      type: String, // could be beach, mountain, cave, temple
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },

    destination: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: null,
    },

    hotelFacility: {
      type: [String], // Put some of the images here
      default: [],
    },
    luxuryPackage: {
      type: String,
      default: "",
    },

    /////////////////////////////
    // Marketing & SEO
    /////////////////////////////
    coverImage: {
      type: String,
      required: true,
    },
    badges: {
      type: [String],
      default: [],
    },
    dataImages: {
      type: [String],
      default: [],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    notes: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Package ||
  mongoose.model("Package", TourPackageSchema);
