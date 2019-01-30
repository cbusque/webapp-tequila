const express = require("express");
const router = express.Router();
const db = require("./../lib/db");
var fs = require("fs");

var lions = 0;
var cenne = 0;
var AI = 0;

// Gets all the products in the database.
router.get("/", (req, res) => {
  console.log("missing path");
});

// Gets the product associated with the specified ID.
router.get("/:id", (req, res) => {
  var action = req.query.action;
  switch (action) {
    case "Relacher les lions":
      lions++;
      console.log("lions : " + lions + "/5");
      if (lions >= 5) {
        console.log("Relacher les lions");
        lions = 0;
      }
      break;
    case "Faire tomber une cenne":
      cenne++;
      console.log("cenne : " + cenne + "/5");
      if (cenne >= 5) {
        console.log("Faire tomber une cenne");
        cenne = 0;
      }
      break;
    case "Ajouter un AI":
      AI++;
      console.log("AI : " + AI + "/5");
      if (AI >= 5) {
        console.log("Ajouter un AI");
        AI = 0;
      }
      break;
    default:
      console.log("invalid");
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
