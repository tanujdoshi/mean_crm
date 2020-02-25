const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const bcryptjs = require("bcryptjs");
const { User } = require("../models/models");
const mongo = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017/crsolutions";
const { LayoutSchema } = require("../models/models");
 
router.post("/empauth", (req, res) => {
  console.log("SPACE", req.body.cspace);
  console.log("email , password", req.body.email, req.body.password);
  mongo.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err, client) => {
      var db = client.db("crsolutions");
      db.collection(req.body.cspace + "emps").findOne(
        { email: req.body.email, password: req.body.password },
        (err, docs) => {
          if (err) console.log(err);
          if (docs) {
            console.log(docs);
            res.status(200).json({
              msg: "Auth Ok",
              ok: true
            });
          }
          if (docs === null) {
            res.status(200).json({
              msg: "Auth Not Ok",
              ok: false
            });
          }
        }
      );
    }
  );
});

router.get("/getcrforms/:space", (req, res) => {
  console.log("SPACE:", req.params.space);
  LayoutSchema.find({ cspace: req.params.space }, (err, results) => {
    // console.log(str)
    console.log(results);
    if (results) {
      res.status(200).json({
        docs: results
      });
    }
  });
});

router.post("/savecrform", (req, res) => {
  console.log(req.body.space, "SPACE");
  console.log(req.body.by, "BY");
  console.log(req.body.year, "YEAR");

  jsonOb = req.body.data;
  console.log(jsonOb, "DATA");
  jsonOb.by = req.body.by;
  jsonOb.subdate = new Date().toLocaleDateString();
  jsonOb.formid = req.body.formid;
  jsonOb.year = req.body.year;
  jsonOb.verifystatus = "pending";
  jsonOb.comment = ""
  // console.log(jsonOb, "UPdated");
  mongo.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err, client) => {
      var db = client.db("crsolutions");
      db.collection(req.body.space).findOne(
        { by: req.body.by, formid: req.body.formid },
        (err, docs) => {
          if (docs) {
            res.status(200).json({
              msg: "AlreadySubmitted",
              status: true
            });
            return;
          }
          if (docs === null) {
            db.collection(req.body.space).insertOne(jsonOb, (err, data) => {
              if (data) {
                res.status(200).json({
                  msg: "Form Submitted Successfully",
                  ok: true
                });
              }
              if (err) {
                console.log(err);
                res.status(500).json({
                  msg: "Something went wrong",
                  ok: false
                });
              }
            });
          }
        }
      );
    }
  );
});

router.get("/getresponses/:user/:space", (req, res) => { 
  data = [];
  mongo.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err, client) => {
      var db = client.db("crsolutions");
      db.collection(req.params.space)
        .find({ by: req.params.user })
        .toArray((err, items) => {
          if (items) {
            res.status(200).json({
              docs: items
            });
          }
          console.log("ITEMS", items);
          console.log("ERR", err);

          if (err) {
            res.status(500).json({
              msg: "NOT FOUND!!"
            });
          }
        });
    }
  );
});

router.get("/getresponse/:idn/:space/:user", (req, res) => {
  mongo.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err, client) => {
      var o_id = new mongodb.ObjectID(req.params.idn);
      var db = client.db("crsolutions");
      console.log(o_id, "ID");
      console.log(req.params.space, "SPACE");
      db.collection(req.params.space)
        .findOne({ _id: o_id })
        .then(result => {
          console.log(result);
          res.status(200).json({
            docs: result
          });
        });
    }
  );
});

module.exports = router;
