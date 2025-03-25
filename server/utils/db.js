import mongoose from "mongoose";
import { configInfo } from "../config/index.js";

const MAX_ATTEMPTS = 4; // Maximum retry attempts
const RETRY_DELAYS = [5000, 15000, 25000, 35000]; // Delay in milliseconds

const connectDB = async (attempt = 0) => {
  try {
    await mongoose.connect(configInfo.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(
      `❌ Connection failed (Attempt ${attempt + 1}): ${error.message}`
    );

    if (attempt < MAX_ATTEMPTS) {
      const delay = RETRY_DELAYS[attempt];
      console.log(`🔄 Retrying in ${delay / 1000} seconds...`);
      setTimeout(() => connectDB(attempt + 1), delay);
    } else {
      console.error("🚨 All connection attempts failed. Exiting process.");
      process.exit(1);
    }
  }
};

export default connectDB;
