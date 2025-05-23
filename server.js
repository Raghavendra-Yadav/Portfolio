const express = require("express");
const path = require("path");
const compression = require("compression"); // Import compression middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Enable Gzip compression
app.use(compression());

// Serve static files from the "public" directory with caching
app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: "1d", // Cache static assets for 1 year
    etag: false, // Disable ETag headers for simplicity
  })
);

// Middleware to dynamically set meta tags
app.use((req, res, next) => {
  res.locals.metaTags = {
    title: "Golla Raghavendra Yadav - Fullstack Developer Portfolio",
    description:
      "Explore the portfolio of Golla Raghavendra Yadav, a fullstack developer, designer, and creative programmer.",
    keywords:
      "Fullstack Developer, Portfolio, Web Developer, Resume, Golla Raghavendra Yadav",
    author: "Golla Raghavendra Yadav",
    url: `https://www.gollaraghavendrayadav.com${req.originalUrl}`,
    image: "https://www.gollaraghavendrayadav.com/images/RaghavendraYadav.png",
  };
  next();
});

// Route to serve the main page with dynamic meta tags
app.get("/", (req, res) => {
  const metaTags = res.locals.metaTags;
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="${metaTags.description}">
      <meta name="keywords" content="${metaTags.keywords}">
      <meta name="author" content="${metaTags.author}">
      <meta property="og:title" content="${metaTags.title}">
      <meta property="og:description" content="${metaTags.description}">
      <meta property="og:image" content="${metaTags.image}">
      <meta property="og:url" content="${metaTags.url}">
      <meta property="og:type" content="website">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${metaTags.title}">
      <meta name="twitter:description" content="${metaTags.description}">
      <meta name="twitter:image" content="${metaTags.image}">
      <title>${metaTags.title}</title>
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
      <h1>Welcome to ${metaTags.title}</h1>
      <p>${metaTags.description}</p>
    </body>
    </html>
  `);
});

// Route to serve the sitemap.xml
app.get("/sitemap.xml", (req, res) => {
  const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
  res.sendFile(sitemapPath);
});

// Route to serve robots.txt
app.get("/robots.txt", (req, res) => {
  const robotsPath = path.join(__dirname, "public", "robots.txt");
  res.sendFile(robotsPath);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
