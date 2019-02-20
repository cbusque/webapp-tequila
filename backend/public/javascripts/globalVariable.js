//this is legit and good
var globalVariable = (function() {
  this.STATES = {
    NULL: "NULL",
    ROUND_1: "round_1",
    ROUND_2: "round_2",
    ROUND_3: "round_3",
    ROUND_4: "round_4"
  };
  this.currentState = STATES.NOT_STARTED;
  //vote for X
  this.voteForLions = 0;
  this.voteForWater = 0;
  this.voteForCheese = 0;
  this.voteForTrap = 0;

  //timer for each acts
  this.timer = 30;

  return this;
})();
module.exports = globalVariable;
