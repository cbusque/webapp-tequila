//this is legit and good
var globalVariable = (function() {
  this.STATES = {
    NULL: "NULL",
    ROUND_1: "round_1",
    ROUND_21: "round_21",
    ROUND_22: "round_22",
    ROUND_3: "round_3",
    ROUND_41: "round_41",
    ROUND_42: "round_42",
    ROUND_5: "round_5",
    ROUND_61: "round_61",
    ROUND_62: "round_62"
  };
  this.currentState = STATES.NOT_STARTED;
  this.lastWinner = "NULL";
  //vote for X
  this.voteForCheval = 0;
  this.voteForVitre = 0;
  this.voteForFeu = 0;
  this.voteForCatapulte = 0;
  this.voteForBateau = 0;
  this.voteForMontagne = 0;
  //timer for each acts
  this.timer = 60;
  this.pWinner = "";

  return this;
})();
module.exports = globalVariable;
