// Import required modules
const React = require("react");
const { useEffect } = React;

const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

const db = require("./db");

// Import API routes
const photos = require("./routes/photos");
const topics = require("./routes/topics");

// Helper function to read files
function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: "utf-8" }, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}

module.exports = function application(ENV) {
  // Middleware setup
  app.use(cors());
  app.use(helmet());
  app.use(bodyparser.json());
  app.use(express.static(path.join(__dirname, 'public')));

  // Mount routes
  app.use("/api", photos(db));
  app.use("/api", topics(db));

  // Add reset endpoint in development and testing
  if (ENV === "development" || ENV === "test") {
    Promise.all([
      read(path.resolve(__dirname, `db/schema/create.sql`)),
      read(path.resolve(__dirname, `db/schema/${ENV}.sql`))
    ])
      .then(([create, seed]) => {
        app.get("/api/debug/reset", (request, response) => {
          db.query(create)
            .then(() => db.query(seed))
            .then(() => {
              console.log("Database Reset");
              response.status(200).send("Database Reset");
            });
        });
      })
      .catch(error => console.log(`Error setting up reset: ${error}`));
  }

  // Clean up database connection on close
  app.close = () => db.end();

  return app;
};

