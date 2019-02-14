var state = (function() {
  this.STATES = {
    NOT_STARTED: "not_started",
    ACT1: "act1",
    ACT2: "act2",
    ACT3: "act3"
  };
  this.currentState = STATES.NOT_STARTED;
  return this;
})();

module.exports = state;
