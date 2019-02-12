const express = require("express");
const router = express.Router();
const db = require("../lib/db");
var globalVariable = require("../public/javascripts/globalVariable");

// Gets all the products in the database.
router.get("/", (req, res) => {});

// post the game
router.post("/:id", (req, res) => {
  var state = req.query.state;
  globalVariable.currentState = state;
  //var init
  globalVariable.voteForCheese = 0;
  globalVariable.voteForWater = 0;
  globalVariable.voteForTrap = 0;
  globalVariable.voteForLions = 0;

  var time = req.query.timer;
  if (time > 0) {
    globalVariable.timer = time;
  }

  console.log("current state : " + globalVariable.currentState);
  console.log("timer set to  : " + globalVariable.timer);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.send();
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
