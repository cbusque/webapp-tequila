const express = require("express");
const router = express.Router();
const db = require("../lib/db");
var states = require("../public/javascripts/states");

// Gets all the products in the database.
router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(states.currentState);
});

// Gets the product associated with the specified ID.
// get images for button on frontend
router.get("/:id", (req, res) => {});

// Adds a new product in the database.
router.post("/", (req, res) => {
  console.log("fail");
});

// Deletes the product associated with the specified ID in the database.
router.delete("/:id", (req, res) => {});

// Deletes all the products in the database.
router.delete("/", (req, res) => {});

module.exports = router;
