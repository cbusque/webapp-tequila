//this is legit and good
var globalVariable = (function() {
  this.STATES = {
    NULL: "NULL",
    ROUND_1: "round_1",
    ROUND_2: "round_2",
    ROUND_3: "round_3",
    ROUND_4: "round_4",
    ROUND_5: "round_5"
  };
  this.currentState = STATES.NOT_STARTED;
  //vote for X
  this.voteForBouteille = 0;
  this.voteForToxique = 0;
  this.voteForBoule = 0;
  this.voteForPatte = 0;
  this.voteForCatapulte = 0;
  this.voteForCheval = 0;
  this.voteForInondation = 0;
  this.voteForMontagne = 0;
  this.voteForFeu = 0;
  //timer for each acts
  this.timer = 60;

  return this;
})();
module.exports = globalVariable;
