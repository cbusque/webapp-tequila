const express = require("express");
const router = express.Router();
const db = require("./../lib/db");
var gb = require("../public/javascripts/globalVariable");

// Gets all the products in the database.
router.get("/", (req, res) => {
  console.log("missing path");
});

// get le nbr de vote
router.get("/:id", (req, res) => {
  var action = req.query.action;
  res.writeHead(200, { "Content-Type": "text/plain" });
  switch (action) {
    case "bouteille":
      console.log("bouteille");
      res.end(gb.voteForBouteille.toString());
      break;
    case "toxique":
      console.log("toxique");
      res.end(gb.voteForToxique.toString());
      break;
    case "boule":
      console.log("boule");
      res.end(gb.voteForBoule.toString());
      break;
    case "patte":
      console.log("patte");
      res.end(gb.voteForPatte.toString());
      break;
    case "catapulte":
      console.log("catapulte");
      res.end(gb.voteForCatapulte.toString());
      break;
    case "cheval":
      console.log("cheval");
      res.end(gb.voteForCheval.toString());
      break;
    case "inondation":
      console.log("inondation");
      res.end(gb.voteForInondation.toString());
      break;
    case "montagne":
      console.log("montagne");
      res.end(gb.voteForMontagne.toString());
      break;
    case "feu":
      console.log("feu");
      res.end(gb.voteForFeu.toString());
      break;
    default:
      console.log("invalid");
      res.end("Invalid");
      break;
  }
});
// Gets the product associated with the specified ID.
router.post("/:id", (req, res) => {
  var action = req.query.action;
  switch (action) {
    case "lions":
      gb.voteForLions++;
      console.log("lions : " + gb.voteForLions + "/5");
      if (gb.voteForLions >= 5) {
        console.log("lions");
        gb.voteForLions = 0;
      }
      break;
    case "water":
      gb.voteForWater++;
      console.log("water : " + gb.voteForWater + "/5");
      if (gb.voteForWater >= 5) {
        console.log("water");
        gb.voteForWater = 0;
      }
      break;
    case "cheese":
      gb.voteForCheese++;
      console.log("cheese : " + gb.voteForCheese + "/5");
      if (gb.voteForCheese >= 5) {
        console.log("Ajouter un AI");
        gb.voteForCheese = 0;
      }
      break;
    case "trap":
      gb.voteForTrap++;
      console.log("trap : " + gb.voteForTrap + "/5");
      if (gb.voteForTrap >= 5) {
        console.log("Ajouter une trap");
        gb.voteForTrap = 0;
      }
      break;
    default:
      console.log("invalid");
      break;
  }
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end();
});

module.exports = router;
