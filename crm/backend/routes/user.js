const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const { User } = require("../models/models");
const mongo = require("mongodb").MongoClient;
//const mongo = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017/crsolutions";

// var database;
// mongo.connect(
//   url,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   },
//   (err, client) => {
//     if (err) {
//       console.log("Failed with connection using mongoclient!");
//       return;
//     } else {
//       //console.log("Connected to DB using mongo client");
//       database = client.db("crsolutions");
//     }
//   }
// );

router.post("/signup", (req, res, next) => {
  bcryptjs.hash(req.body.password, 10, (err, hash) => {
    if (err) return next(err);
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hash,
      email: req.body.email,
      worksat: req.body.worksat,
      designation: req.body.designation,
      contact: req.body.contact
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          msg: "User created!",
          res: result,
          ok: true
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({
          error: err,
          ok: false
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetcheddata;
  mongo.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err, client) => {
      var db = client.db("crsolutions");
      db.collection("users")
        .findOne({ email: req.body.email })
        .then(op => {
          fetcheddata = op;
          console.log(fetcheddata);
          const isok = bcryptjs
            .compare(req.body.password, fetcheddata.password)
            .then(result => {
              if (!result) {
                res.status(401).json({ msg: "not ok", ok: false });
              }
              res.status(200).json({
                msg: "User is OK",
                ok: true
              });
            })
            .catch(err => console.log(err));
        });
      // console.log(err);
    }
  );
});

router.post("/createspace", (req, res, next) => {
    console.log(req.body.company)
  mongo.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
        var db = client.db('crsolutions');
        db.listCollections({name: req.body.company}).next(function(err, data) {
          console.log('inside method')
            if(data === null) {
              console.log('NOT EXIST')
              db.createCollection(req.body.company, (err, created) => {
                if(created) {
                  res.status(200).json({
                    msg: 'Not exist, Created Successfully!',
                    ok: true
                  })
                  User.findOneAndUpdate({email: req.body.email}, {$set: {companyspace: req.body.company}}, {new: true}, (err, doc) => {
                    if (err) console.log(err, 'in update')
                    console.log('DOC:', doc)
                  })
                }
              })
             
            } else {
              res.status(500).json({
                msg: 'Exist',
                ok: false
              })
            }
        });
          
    }
  );
});

module.exports = router;
