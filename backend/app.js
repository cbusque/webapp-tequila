const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");

require("./lib/db");
const images = require("./routes/images");
const actions = require("./routes/actions");
const inGameEvents = require("./routes/inGameEvents");
const options = require("./routes/options");

var globalVariable = require("./public/javascripts/globalVariable");

const app = express();

if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// initialize the session
app.use(
  session({
    secret: "ConcoursUbisoft",
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: "/",
      maxAge: 1000 * 60 * 24, // 24 hours
      secure: false
    }
  })
);

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

//IngameEvent
app.get("/", function(req, res) {
  console.log(5);
  res.json({ customInt: 5 });
});

app.get("/start_round_1", function(req, res) {
  console.log("round 1");
  globalVariable.currentState = "round_1";
  globalVariable.voteForCheese = 0;
  globalVariable.voteForWater = 0;
  globalVariable.voteForTrap = 0;
  globalVariable.voteForLions = 0;
  res.json({ customInt: 0 });
});

app.get("/start_round_2", function(req, res) {
  console.log("round 2");
  globalVariable.currentState = "round_2";
  globalVariable.voteForCheese = 0;
  globalVariable.voteForWater = 0;
  globalVariable.voteForTrap = 0;
  globalVariable.voteForLions = 0;
  res.json({ customInt: 0 });
});

app.get("/start_round_3", function(req, res) {
  console.log("round 3");
  globalVariable.currentState = "round_3";
  globalVariable.voteForCheese = 0;
  globalVariable.voteForWater = 0;
  globalVariable.voteForTrap = 0;
  globalVariable.voteForLions = 0;
  res.json({ customInt: 0 });
});

app.get("/start_round_4", function(req, res) {
  console.log("round 4");
  globalVariable.currentState = "round_4";
  globalVariable.voteForCheese = 0;
  globalVariable.voteForWater = 0;
  globalVariable.voteForTrap = 0;
  globalVariable.voteForLions = 0;
  res.json({ customInt: 0 });
});

app.get("/get_result", function(req, res) {
  console.log("getting result");
  globalVariable.currentState = "NULL";
  if (
    globalVariable.voteForCheese >= globalVariable.voteForWater &&
    globalVariable.voteForCheese >= globalVariable.voteForTrap &&
    globalVariable.voteForCheese >= globalVariable.voteForLions
  ) {
    res.json({ customInt: 1 });
  } else if (
    globalVariable.voteForWater >= globalVariable.voteForCheese &&
    globalVariable.voteForWater >= globalVariable.voteForTrap &&
    globalVariable.voteForWater >= globalVariable.voteForLions
  ) {
    res.json({ customInt: 2 });
  } else if (
    globalVariable.voteForTrap >= globalVariable.voteForCheese &&
    globalVariable.voteForTrap >= globalVariable.voteForWater &&
    globalVariable.voteForTrap >= globalVariable.voteForLions
  ) {
    res.json({ customInt: 3 });
  } else if (
    globalVariable.voteForLions >= globalVariable.voteForCheese &&
    globalVariable.voteForLions >= globalVariable.voteForTrap &&
    globalVariable.voteForLions >= globalVariable.voteForWater
  ) {
    res.json({ customInt: 4 });
  }
});

app.use("/api/actions", actions);
app.use("/api/options", options);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
