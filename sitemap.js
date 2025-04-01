const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const path = require("path");

// Define the base URL of your website
const BASE_URL = "https://www.gollaraghavendrayadav.com/"; // Replace with your live domain if deployed

// Define the routes to include in the sitemap
const routes = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/#profile", changefreq: "weekly", priority: 0.8 },
  { url: "/#education", changefreq: "weekly", priority: 0.8 },
  { url: "/#abilities", changefreq: "weekly", priority: 0.8 },
  { url: "/#projects", changefreq: "weekly", priority: 0.8 },
  { url: "/#contact", changefreq: "weekly", priority: 0.8 },
];

// Create a sitemap stream
const sitemap = new SitemapStream({ hostname: BASE_URL });

// Write the sitemap to a file
const writeStream = createWriteStream(
  path.join(__dirname, "public", "sitemap.xml")
);
sitemap.pipe(writeStream);

// Add routes to the sitemap
routes.forEach((route) => sitemap.write(route));

// End the sitemap stream
sitemap.end();

// Log success message
streamToPromise(sitemap)
  .then(() => console.log("Sitemap successfully created at public/sitemap.xml"))
  .catch((err) => console.error("Error creating sitemap:", err));
