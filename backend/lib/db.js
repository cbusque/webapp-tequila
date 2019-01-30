"use strict";

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Action = new Schema(
  {
    id: { type: Number, unique: true },
    name: String,
    vote: Number
  },
  { versionKey: false }
);

mongoose.model("action", Action);

mongoose.Promise = global.Promise;

// TODO:
mongoose.connect(
  "mongodb://admin0:admin1234@ds015915.mlab.com:15915/ubisoft19",
  { useNewUrlParser: true }
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function() {
  db.db.collection("Actions", function(err, collection) {
    collection.find({}).toArray(function(err, data) {
      console.log(data); // it will print your collection data
    });
  });
});

module.exports = db;
