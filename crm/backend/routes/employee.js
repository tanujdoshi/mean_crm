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
  jsonOb.comment = "";
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

router.get("/getFormData/:formid/:year/:space", (req, res) => {
  console.log(
    "EARLIER RES CALLED",
    req.params.formid,
    req.params.year,
    req.params.space
  );
  mongo.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err, client) => {
      var db = client.db("crsolutions");
      const o_id = new mongodb.ObjectID(req.params.formid);
      db.collection(req.params.space).findOne({ _id: o_id }, (err, result) => {
        if (err) {
          console.log(err);
        }
        delete result["_id"];
        delete result["by"];
        delete result["formid"];
        delete result["year"];
        delete result["verifystatus"];
        delete result["comment"];
        delete result["subdate"];

        if (result) {
          console.log(result);
          res.status(200).json({
            docs: result,
            ok: true
          });
        }
      });
    }
  );
});

router.post("/saveEditedResponse/:space/:formid", (req, res) => {
  console.log("SAVEEDITCALLED", req.body.data);
  dataOb = req.body.data;
  keys = Object.keys(dataOb);
  stringKeys = JSON.stringify(keys);
  console.log(stringKeys);
  values = Object.values(dataOb);
  stringValues = JSON.stringify(values);
  console.log(stringValues);
  console.log(req.params.formid, "FORMID");
  mongo.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err, client) => {
      var db = client.db("crsolutions");
      var o_id = new mongodb.ObjectID(req.params.formid);
      for (let i = 0; i < keys.length; i++) {
        var key = keys[i];
        console.log(key);
        var value = values[i];
        console.log(value);
        db.collection(req.params.space).updateOne(
          { _id: o_id },
          { $set: { [key]: value } },
          (err, response) => {
            if (err) {
              console.log(err);
            }
            if (response) {
              console.log(response);
            }
          }
        );
      }
      res.status(200).json({ok:true})
    }
  );
});

module.exports = router;
