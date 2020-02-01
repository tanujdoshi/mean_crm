const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const { User } = require("../models/models");
const mongo = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017/crsolutions";
const { LayoutSchema } = require("../models/models");
var myOb;
router.post("/addlayout/:creator", (req, res) => {
  console.log("CREATOR: ", req.params.creator);
  console.log("OBJECT: ", myOb);
  const model = new LayoutSchema({
    creator: req.params.creator,
    layout: req.body.layout,
    cspace: req.body.cspace,
    submityear: req.body.foryear
  });
  model
    .save()
    .then(result => {
      res.status(200).json({
        msg: "Insert OK," + result,
        ok: true
      });
    })
    .catch(err => {
      console.log("Error in  addding layout", err);
    });
});

router.get("/getformdata/:id", (req, res) => {
  console.log("ID of form: ", req.params.id);
  LayoutSchema.findOne({ _id: req.params.id }, (err, result) => {
    console.log(result.layout.tickets);
    if (result) {
      res.status(200).json({
        msg: "found data",
        ok: true,
        docs: result.layout.tickets
      });
    }
    if (result === null) {
      res.status(401).json({
        msg: "not found",
        ok: false
      });
    }
  });
});

module.exports = router;
