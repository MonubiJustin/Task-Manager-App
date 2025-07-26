require("dotenv").config();
const express = require("express");
const app = express();

// Health check endpoint.
app.get("/health", (req, res) => {
  res.status(200).send("Hello world");
});

// routes
require("./startup/db")(); // connection to database
require("./startup/routes")(app); // middleware

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
