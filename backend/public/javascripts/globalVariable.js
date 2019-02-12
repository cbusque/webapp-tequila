//this is legit and good
var globalVariable = (function() {
  this.STATES = {
    NOT_STARTED: "not_started",
    ACT1: "act1",
    ACT2: "act2",
    ACT3: "act3"
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
