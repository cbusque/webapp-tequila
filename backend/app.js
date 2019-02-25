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
  globalVariable.voteForBouteille = 0;
  globalVariable.voteForToxique = 0;
  globalVariable.voteForBoule = 0;
  globalVariable.voteForPatte = 0;
  globalVariable.voteForCatapulte = 0;
  globalVariable.voteForCheval = 0;
  globalVariable.voteForInondation = 0;
  globalVariable.voteForMontagne = 0;
  globalVariable.voteForFeu = 0;
  res.json({ customInt: 0 });
});

app.get("/start_round_2", function(req, res) {
  console.log("round 2");
  globalVariable.currentState = "round_2";
  globalVariable.voteForBouteille = 0;
  globalVariable.voteForToxique = 0;
  globalVariable.voteForBoule = 0;
  globalVariable.voteForPatte = 0;
  globalVariable.voteForCatapulte = 0;
  globalVariable.voteForCheval = 0;
  globalVariable.voteForInondation = 0;
  globalVariable.voteForMontagne = 0;
  globalVariable.voteForFeu = 0;
  res.json({ customInt: 0 });
});

app.get("/start_round_3", function(req, res) {
  console.log("round 3");
  globalVariable.currentState = "round_3";
  globalVariable.voteForBouteille = 0;
  globalVariable.voteForToxique = 0;
  globalVariable.voteForBoule = 0;
  globalVariable.voteForPatte = 0;
  globalVariable.voteForCatapulte = 0;
  globalVariable.voteForCheval = 0;
  globalVariable.voteForInondation = 0;
  globalVariable.voteForMontagne = 0;
  globalVariable.voteForFeu = 0;
  res.json({ customInt: 0 });
});

app.get("/start_round_4", function(req, res) {
  console.log("round 4");
  globalVariable.currentState = "round_4";
  globalVariable.voteForBouteille = 0;
  globalVariable.voteForToxique = 0;
  globalVariable.voteForBoule = 0;
  globalVariable.voteForPatte = 0;
  globalVariable.voteForCatapulte = 0;
  globalVariable.voteForCheval = 0;
  globalVariable.voteForInondation = 0;
  globalVariable.voteForMontagne = 0;
  globalVariable.voteForFeu = 0;
  res.json({ customInt: 0 });
});

app.get("/start_round_5", function(req, res) {
  console.log("round 5");
  globalVariable.currentState = "round_5";
  globalVariable.voteForBouteille = 0;
  globalVariable.voteForToxique = 0;
  globalVariable.voteForBoule = 0;
  globalVariable.voteForPatte = 0;
  globalVariable.voteForCatapulte = 0;
  globalVariable.voteForCheval = 0;
  globalVariable.voteForInondation = 0;
  globalVariable.voteForMontagne = 0;
  globalVariable.voteForFeu = 0;
  res.json({ customInt: 0 });
});

app.get("/get_result", function(req, res) {
  console.log("getting result");
  globalVariable.currentState = "NULL";
  if (
    globalVariable.voteForBouteille >= globalVariable.voteForToxique &&
    globalVariable.voteForBouteille >= globalVariable.voteForBoule &&
    globalVariable.voteForBouteille >= globalVariable.voteForPatte &&
    globalVariable.voteForBouteille >= globalVariable.voteForCatapulte &&
    globalVariable.voteForBouteille >= globalVariable.voteForCheval &&
    globalVariable.voteForBouteille >= globalVariable.voteForInondation &&
    globalVariable.voteForBouteille >= globalVariable.voteForMontagne &&
    globalVariable.voteForBouteille >= globalVariable.voteForFeu
  ) {
    res.json({ customInt: 1 });
  } else if (
    globalVariable.voteForToxique >= globalVariable.voteForBouteille &&
    globalVariable.voteForToxique >= globalVariable.voteForBoule &&
    globalVariable.voteForToxique >= globalVariable.voteForPatte &&
    globalVariable.voteForToxique >= globalVariable.voteForCatapulte &&
    globalVariable.voteForToxique >= globalVariable.voteForCheval &&
    globalVariable.voteForToxique >= globalVariable.voteForInondation &&
    globalVariable.voteForToxique >= globalVariable.voteForMontagne &&
    globalVariable.voteForToxique >= globalVariable.voteForFeu
  ) {
    res.json({ customInt: 2 });
  } else if (
    globalVariable.voteForBoule >= globalVariable.voteForBouteille &&
    globalVariable.voteForBoule >= globalVariable.voteForToxique &&
    globalVariable.voteForBoule >= globalVariable.voteForPatte &&
    globalVariable.voteForBoule >= globalVariable.voteForCatapulte &&
    globalVariable.voteForBoule >= globalVariable.voteForCheval &&
    globalVariable.voteForBoule >= globalVariable.voteForInondation &&
    globalVariable.voteForBoule >= globalVariable.voteForMontagne &&
    globalVariable.voteForBoule >= globalVariable.voteForFeu
  ) {
    res.json({ customInt: 3 });
  } else if (
    globalVariable.voteForPatte >= globalVariable.voteForBouteille &&
    globalVariable.voteForPatte >= globalVariable.voteForBoule &&
    globalVariable.voteForPatte >= globalVariable.voteForToxique &&
    globalVariable.voteForPatte >= globalVariable.voteForCatapulte &&
    globalVariable.voteForPatte >= globalVariable.voteForCheval &&
    globalVariable.voteForPatte >= globalVariable.voteForInondation &&
    globalVariable.voteForPatte >= globalVariable.voteForMontagne &&
    globalVariable.voteForPatte >= globalVariable.voteForFeu
  ) {
    res.json({ customInt: 4 });
  } else if (
    globalVariable.voteForCatapulte >= globalVariable.voteForToxique &&
    globalVariable.voteForCatapulte >= globalVariable.voteForBoule &&
    globalVariable.voteForCatapulte >= globalVariable.voteForPatte &&
    globalVariable.voteForCatapulte >= globalVariable.voteForBouteille &&
    globalVariable.voteForCatapulte >= globalVariable.voteForCheval &&
    globalVariable.voteForCatapulte >= globalVariable.voteForInondation &&
    globalVariable.voteForCatapulte >= globalVariable.voteForMontagne &&
    globalVariable.voteForCatapulte >= globalVariable.voteForFeu
  ) {
    res.json({ customInt: 5 });
  } else if (
    globalVariable.voteForCheval >= globalVariable.voteForToxique &&
    globalVariable.voteForCheval >= globalVariable.voteForBoule &&
    globalVariable.voteForCheval >= globalVariable.voteForPatte &&
    globalVariable.voteForCheval >= globalVariable.voteForCatapulte &&
    globalVariable.voteForCheval >= globalVariable.voteForBouteille &&
    globalVariable.voteForCheval >= globalVariable.voteForInondation &&
    globalVariable.voteForCheval >= globalVariable.voteForMontagne &&
    globalVariable.voteForCheval >= globalVariable.voteForFeu
  ) {
    res.json({ customInt: 6 });
  } else if (
    globalVariable.voteForInondation >= globalVariable.voteForToxique &&
    globalVariable.voteForInondation >= globalVariable.voteForBoule &&
    globalVariable.voteForInondation >= globalVariable.voteForPatte &&
    globalVariable.voteForInondation >= globalVariable.voteForCatapulte &&
    globalVariable.voteForInondation >= globalVariable.voteForCheval &&
    globalVariable.voteForInondation >= globalVariable.voteForBouteille &&
    globalVariable.voteForInondation >= globalVariable.voteForMontagne &&
    globalVariable.voteForInondation >= globalVariable.voteForFeu
  ) {
    res.json({ customInt: 7 });
  } else if (
    globalVariable.voteForMontagne >= globalVariable.voteForToxique &&
    globalVariable.voteForMontagne >= globalVariable.voteForBoule &&
    globalVariable.voteForMontagne >= globalVariable.voteForPatte &&
    globalVariable.voteForMontagne >= globalVariable.voteForCatapulte &&
    globalVariable.voteForMontagne >= globalVariable.voteForCheval &&
    globalVariable.voteForMontagne >= globalVariable.voteForInondation &&
    globalVariable.voteForMontagne >= globalVariable.voteForBouteille &&
    globalVariable.voteForMontagne >= globalVariable.voteForFeu
  ) {
    res.json({ customInt: 8 });
  } else if (
    globalVariable.voteForFeu >= globalVariable.voteForToxique &&
    globalVariable.voteForFeu >= globalVariable.voteForBoule &&
    globalVariable.voteForFeu >= globalVariable.voteForPatte &&
    globalVariable.voteForFeu >= globalVariable.voteForCatapulte &&
    globalVariable.voteForFeu >= globalVariable.voteForCheval &&
    globalVariable.voteForFeu >= globalVariable.voteForInondation &&
    globalVariable.voteForFeu >= globalVariable.voteForMontagne &&
    globalVariable.voteForFeu >= globalVariable.voteForBouteille
  ) {
    res.json({ customInt: 9 });
  } else res.json({ customInt: 0 });
  globalVariable.voteForBouteille = 0;
  globalVariable.voteForToxique = 0;
  globalVariable.voteForBoule = 0;
  globalVariable.voteForPatte = 0;
  globalVariable.voteForCatapulte = 0;
  globalVariable.voteForCheval = 0;
  globalVariable.voteForInondation = 0;
  globalVariable.voteForMontagne = 0;
  globalVariable.voteForFeu = 0;
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
