const express = require("express");
const body = require("body-parser");
const path = require("path");
const userRoutes = require('../backend/routes/user')
const app = express();
//const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);

mongoose
  .connect("mongodb://127.0.0.1:27017/crsolutions", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to DB using mongoose !");
  })
  .catch(err => {
    console.log("Failed to Connec to DB.!", err);
  });




module.exports = mongoose.Connection;

app.use(body.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT,  PATCH, DELETE, OPTIONS, Authorization"
  );
  next();
});

app.use('/api/user', userRoutes );

module.exports = app;
