const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Handle other routes (optional)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route to serve the sitemap.xml
app.get("/sitemap.xml", (req, res) => {
  const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
  res.sendFile(sitemapPath);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
