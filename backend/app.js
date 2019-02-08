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

app.use("/api/actions", actions);
app.use("/api/inGameEvents", inGameEvents);
//app.use("/api/images", images);
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
