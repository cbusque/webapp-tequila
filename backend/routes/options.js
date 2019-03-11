const express = require("express");
const router = express.Router();
const db = require("../lib/db");
var gb = require("../public/javascripts/globalVariable");

// Gets all the products in the database.
//this return to the frontend page what is the game state
//the front end should know that to do for each state (hardcoded)
router.get("/", (req, res) => {
  res.json({
    state: gb.currentState,
    voteForCheval: gb.voteForCheval,
    voteForVitre: gb.voteForVitre,
    voteForFeu: gb.voteForFeu,
    voteForCatapulte: gb.voteForCatapulte,
    voteForBateau: gb.voteForBateau,
    voteForMontagne: gb.voteForMontagne
  });
});

module.exports = router;
