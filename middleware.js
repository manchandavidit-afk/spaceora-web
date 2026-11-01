
const express = require("express");
const path = require("path");

const app = express();

// Hosting panel port or default port
const PORT = process.env.PORT || 3000;

// Security and request middleware
app.disable("x-powered-by");

app.use(express.json({
    limit: "20kb"
}));

app.use(express.urlencoded({
    extended: false,
    limit: "20kb"
}));

// Serve website files
app.use(express.static(__dirname, {
    extensions: ["html"],
    etag: true,
    maxAge: process.env.NODE_ENV === "production" ? "1h" : 0
}));

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        app: "violet-website",
        message: "Website is running successfully!"
    });
});

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// 404 handler
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log("--------------------------------");
    console.log("💜 VIOLET WEBSITE STARTED");
    console.log("--------------------------------");
    console.log(`🌐 Port: ${PORT}`);
    console.log(`🚀 Server: http://localhost:${PORT}`);
    console.log("--------------------------------");
});
