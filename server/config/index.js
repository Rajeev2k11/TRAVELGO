// All configuration/Private credentails are defined here
export const configInfo = {
  MONGO_URI: process.env.MONGO_URL || "mongodb://localhost:27017/test",
  PORT: 3000 | 5001,
  allowedOrigins: [
    "http://localhost:3000", // Development
    "https://travelgo-frontend-lemon.vercel.app", // Production
    "http://localhost:5001",
  ],
};
