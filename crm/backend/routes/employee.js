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

router.get('/getcrforms/:space', (req, res) => {
    console.log('SPACE:', req.params.space)
    LayoutSchema.find({cspace: req.params.space}, (err, results) => {
      // console.log(str)
      console.log(results)
      if(results) {
        res.status(200).json({
          docs: results
        })
      }
    })
})

module.exports = router;
