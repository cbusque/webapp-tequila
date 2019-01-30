const express = require("express");
const router = express.Router();
const db = require("./../lib/db");

// Gets all the products in the database.
router.get("/", (req, res) => {
  console.log("missing path");
});

// Gets the product associated with the specified ID.
router.get("/:id", (req, res) => {
  var action = req.query.action;
  console.log(action);
  switch (action) {
    case "lion":
      console.log("should get number of vote for action");
      break;
    case "money":
      break;
    case "AI":
      break;
  }
});

// Adds a new product in the database.
router.post("/", (req, res) => {});

// Deletes the product associated with the specified ID in the database.
router.delete("/:id", (req, res) => {});

// Deletes all the products in the database.
router.delete("/", (req, res) => {});

module.exports = router;
