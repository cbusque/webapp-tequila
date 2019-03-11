const express = require("express");
const router = express.Router();
const db = require("./../lib/db");
var gb = require("../public/javascripts/globalVariable");

// Gets all the products in the database.
router.get("/", (req, res) => {
  console.log("missing path");
});

// Gets the product associated with the specified ID.
router.post("/:id", (req, res) => {
  var action = req.query.action;
  switch (action) {
    case "vitre":
      gb.voteForVitre++;
      console.log("vitre");
      break;
    case "cheval":
      gb.voteForCheval++;
      console.log("cheval");
      break;
    case "feu":
      gb.voteForFeu++;
      console.log("feu");
      break;
    case "catapulte":
      gb.voteForCatapulte++;
      console.log("catapulte");
      break;
    case "bateau":
      gb.voteForBateau++;
      console.log("bateau");
      break;
    case "montagne":
      gb.voteForMontagne++;
      console.log("montagne");
      break;
    default:
      console.log("invalid");
      break;
  }
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end();
});

module.exports = router;
