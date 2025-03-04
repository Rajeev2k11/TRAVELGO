const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Express deployed on Vercel!");
});

module.exports = serverless(app); // Wrap with serverless-http
