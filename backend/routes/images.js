const express = require("express");
const router = express.Router();
const db = require("../lib/db");
var states = require("../public/javascripts/states");
fs = require("fs");

// Gets all the products in the database.
router.get("/", (req, res) => {
  console.log("missing path");
});

// Gets the product associated with the specified ID.
// get images for button on frontend
router.get("/:id", (req, res) => {
  var image = req.query.image;
  console.log(image);
  console.log(states.currentState);
  switch (image) {
    case "lions":
      var img = fs.readFileSync("./public/images/lions.jpg");
      res.writeHead(200, { "Content-Type": "image/gif" });
      res.end(img, "binary");
      break;
    case "ai":
      var img = fs.readFileSync("./public/images/ai.jpg");
      res.writeHead(200, { "Content-Type": "image/gif" });
      res.end(img, "binary");
      break;
    case "money":
      var img = fs.readFileSync("./public/images/money.jpg");
      res.writeHead(200, { "Content-Type": "image/gif" });
      res.end(img, "binary");
      break;
    default:
      console.log("invalid");
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end();
      break;
  }
});

// Adds a new product in the database.
router.post("/", (req, res) => {
  console.log("fail");
});

// Deletes the product associated with the specified ID in the database.
router.delete("/:id", (req, res) => {});

// Deletes all the products in the database.
router.delete("/", (req, res) => {});

module.exports = router;
