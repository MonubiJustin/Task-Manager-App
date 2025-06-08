const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const tasks = require("../routes/tasks");
const users = require("../routes/users");
const notFound = require("../middleware/notFound");
const error = require("../middleware/error");

module.exports = function (app) {
  // Enable CORS
  app.use(cors());

  // Parse JSON requests
  app.use(express.json());

  // HTTP request logging
  app.use(morgan("tiny"));

  // API routes
  app.use("/api/v1/tasks", tasks);
  app.use("/api/v1/users", users);

  // Serve static files
  app.use(express.static(path.join(__dirname, "../public")));

  // Middleware for handling 404 and errors
  app.use(notFound);
  app.use(error);
};
