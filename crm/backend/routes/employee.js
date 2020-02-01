const express = require("express");
const router = express.Router();
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
  jsonOb = req.body.data;
  console.log(jsonOb, "DATA");
  jsonOb.by = req.body.by;
  jsonOb.subdate = new Date().toLocaleDateString();
  jsonOb.formid = req.body.formid;
  jsonOb.verifystatus = "pending";
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
            res.status(500).json({
              msg: "Already Submitted",
              status: true
            });
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

module.exports = router;
