// Mongoose Schema
import mongoose from "mongoose";

const TourPackageSchema = new mongoose.Schema(
  {
    // Primary Details
    /////////////////////////////////
    id: {
      type: String,
      required: true,
      unique: true,
    },
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
    adult: {
      type: Number,
      default: 0,
      min: 0,
    },
    child: {
      type: Number,
      default: 0,
      min: 0,
    },
    dateAdded: {
      type: Date,
      default: Date.now,
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
      type: String,
      default: "",
    },
    destinationType: {
      type: String,
      enum: ["international", "domestic"],
      default: "domestic",
    },
    destinationSearch: {
      type: [String],
      required: true,
    },
    tourType: {
      type: String,
      default: "Group",
    },
    activityType: {
      type: String,
      default: null,
    },
    landscapeType: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },

    ////////////////////////////////
    // Pricing & Bookings
    ////////////////////////////////
    webPackPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    packageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4.5,
    },
    starRating: {
      type: Number,
      min: 0,
      max: 5,
    },
    hotel: {
      type: String,
      default: null,
    },

    //////////////////////////////
    // Travel date and duration
    //////////////////////////////
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
      max: 30,
    },
    monthLevelSelect: {
      type: String,
      default: "",
    },

    //////////////////////////////
    //Destination and Information
    //////////////////////////////
    destination: {
      type: String, // Strings seperated by comma
      required: true,
    },
    location: {
      type: String,
      default: null,
    },
    dayWiseDuration: {
      type: Number,
      required: true,
      min: 1,
      max: 30,
    },

    //////////////////////////////
    // Accomodation & Facilities
    //////////////////////////////
    hotelFacility: {
      type: [String],
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

    ///////////////////////////////////
    // Additional Features
    ///////////////////////////////////
    notes: {
      type: String,
      default: null,
    },
    departureCity: {
      type: String,
      default: "",
    },
    onArrivalVisa: {
      type: String,
      default: "Granted",
    },
    groupDates: {
      type: [Date],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Package ||
  mongoose.model("Package", TourPackageSchema);
