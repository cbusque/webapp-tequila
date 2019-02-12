const express = require("express");
const router = express.Router();
const db = require("../lib/db");
var states = require("../public/javascripts/globalVariable");

// Gets all the products in the database.
//this return to the frontend page what is the game state
//the front end should know that to do for each state (hardcoded)
router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(states.currentState);
});

module.exports = router;
