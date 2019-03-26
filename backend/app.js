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
  globalVariable.pWinner = "null";
  console.log("round 1");
  globalVariable.currentState = "round_1";
  globalVariable.voteForCheval = 0;
  globalVariable.voteForVitre = 0;
  globalVariable.voteForFeu = 0;
  globalVariable.voteForCatapulte = 0;
  globalVariable.voteForBateau = 0;
  globalVariable.voteForMontagne = 0;
  res.json({ customInt: 0 });
});

app.get("/start_round_2", function(req, res) {
  globalVariable.pWinner = "null";
  console.log("round 2");
  if (globalVariable.lastWinner === "vitre") {
    globalVariable.currentState = "round_22";
  } else {
    globalVariable.currentState = "round_21";
  }
  globalVariable.voteForCheval = 0;
  globalVariable.voteForVitre = 0;
  globalVariable.voteForFeu = 0;
  globalVariable.voteForCatapulte = 0;
  globalVariable.voteForBateau = 0;
  globalVariable.voteForMontagne = 0;
  res.json({ customInt: 0 });
});

app.get("/start_round_3", function(req, res) {
  globalVariable.pWinner = "null";
  console.log("round 3");
  globalVariable.currentState = "round_3";
  globalVariable.voteForCheval = 0;
  globalVariable.voteForVitre = 0;
  globalVariable.voteForFeu = 0;
  globalVariable.voteForCatapulte = 0;
  globalVariable.voteForBateau = 0;
  globalVariable.voteForMontagne = 0;
  res.json({ customInt: 0 });
});

app.get("/start_round_4", function(req, res) {
  console.log("round 4");
  if (globalVariable.lastWinner === "feu") {
    globalVariable.currentState = "round_41";
  } else {
    globalVariable.currentState = "round_42";
  }
  globalVariable.voteForCheval = 0;
  globalVariable.voteForVitre = 0;
  globalVariable.voteForFeu = 0;
  globalVariable.voteForCatapulte = 0;
  globalVariable.voteForBateau = 0;
  globalVariable.voteForMontagne = 0;
  res.json({ customInt: 0 });
});

app.get("/start_round_5", function(req, res) {
  console.log("round 5");
  globalVariable.currentState = "round_5";
  globalVariable.voteForCheval = 0;
  globalVariable.voteForVitre = 0;
  globalVariable.voteForFeu = 0;
  globalVariable.voteForCatapulte = 0;
  globalVariable.voteForBateau = 0;
  globalVariable.voteForMontagne = 0;
  res.json({ customInt: 0 });
});

app.get("/start_round_6", function(req, res) {
  console.log("round 6");
  if (globalVariable.lastWinner === "bateau") {
    globalVariable.currentState = "round_61";
  } else {
    globalVariable.currentState = "round_62";
  }
  globalVariable.voteForCheval = 0;
  globalVariable.voteForVitre = 0;
  globalVariable.voteForFeu = 0;
  globalVariable.voteForCatapulte = 0;
  globalVariable.voteForBateau = 0;
  globalVariable.voteForMontagne = 0;
  res.json({ customInt: 0 });
});

app.get("/player1", function(req, res) {
  globalVariable.pWinner = "player1";
  globalVariable.voteForCheval = 0;
  globalVariable.voteForVitre = 0;
  globalVariable.voteForFeu = 0;
  globalVariable.voteForCatapulte = 0;
  globalVariable.voteForBateau = 0;
  globalVariable.voteForMontagne = 0;
  res.json({ customInt: 0 });
});

app.get("/player2", function(req, res) {
  globalVariable.pWinner = "player2";
  globalVariable.voteForCheval = 0;
  globalVariable.voteForVitre = 0;
  globalVariable.voteForFeu = 0;
  globalVariable.voteForCatapulte = 0;
  globalVariable.voteForBateau = 0;
  globalVariable.voteForMontagne = 0;
  res.json({ customInt: 0 });
});

app.get("/get_result", function(req, res) {
  console.log("getting result");
  globalVariable.currentState = "NULL";
  if (
    globalVariable.voteForVitre >= globalVariable.voteForCheval &&
    globalVariable.voteForVitre >= globalVariable.voteForFeu &&
    globalVariable.voteForVitre >= globalVariable.voteForCatapulte &&
    globalVariable.voteForVitre >= globalVariable.voteForBateau &&
    globalVariable.voteForVitre >= globalVariable.voteForMontagne
  ) {
    globalVariable.lastWinner = "vitre";
    res.json({ customInt: 2 });
  } else if (
    globalVariable.voteForFeu >= globalVariable.voteForVitre &&
    globalVariable.voteForFeu >= globalVariable.voteForCheval &&
    globalVariable.voteForFeu >= globalVariable.voteForCatapulte &&
    globalVariable.voteForFeu >= globalVariable.voteForBateau &&
    globalVariable.voteForFeu >= globalVariable.voteForMontagne
  ) {
    globalVariable.lastWinner = "feu";
    res.json({ customInt: 3 });
  } else if (
    globalVariable.voteForCatapulte >= globalVariable.voteForVitre &&
    globalVariable.voteForCatapulte >= globalVariable.voteForFeu &&
    globalVariable.voteForCatapulte >= globalVariable.voteForCheval &&
    globalVariable.voteForCatapulte >= globalVariable.voteForBateau &&
    globalVariable.voteForCatapulte >= globalVariable.voteForMontagne
  ) {
    globalVariable.lastWinner = "catapulte";
    res.json({ customInt: 4 });
  } else if (
    globalVariable.voteForBateau >= globalVariable.voteForVitre &&
    globalVariable.voteForBateau >= globalVariable.voteForFeu &&
    globalVariable.voteForBateau >= globalVariable.voteForCatapulte &&
    globalVariable.voteForBateau >= globalVariable.voteForCheval &&
    globalVariable.voteForBateau >= globalVariable.voteForMontagne
  ) {
    globalVariable.lastWinner = "bateau";
    res.json({ customInt: 5 });
  } else if (
    globalVariable.voteForMontagne >= globalVariable.voteForVitre &&
    globalVariable.voteForMontagne >= globalVariable.voteForFeu &&
    globalVariable.voteForMontagne >= globalVariable.voteForCatapulte &&
    globalVariable.voteForMontagne >= globalVariable.voteForBateau &&
    globalVariable.voteForMontagne >= globalVariable.voteForCheval
  ) {
    globalVariable.lastWinner = "montagne";
    res.json({ customInt: 6 });
  } else {
    res.json({ customInt: 0 });
  }
  globalVariable.voteForCheval = 0;
  globalVariable.voteForVitre = 0;
  globalVariable.voteForFeu = 0;
  globalVariable.voteForCatapulte = 0;
  globalVariable.voteForBateau = 0;
  globalVariable.voteForMontagne = 0;
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
