
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve website files
app.use(express.static(path.join(__dirname)));

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "online",
    name: "SPACEORA CLOUD",
    message: "SPACEORA website is running!"
  });
});

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 404 page
app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log("--------------------------------");
  console.log("       SPACEORA CLOUD");
  console.log("--------------------------------");
  console.log(`Website running on port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
});
