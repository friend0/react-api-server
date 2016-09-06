var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_0jpj3dmf:5p0ubcg0cu08032qjbkmu226us@ds017896.mlab.com:17896/heroku_0jpj3dmf";

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

MongoClient.connect(url, function(err, db) {
    if(!err) {
        console.log('connected');
        var collection = db.collection('home');
        router.get('/', function (req, res) {
            collection.find( { }, { "sentiment.type" :1} ).toArray(function (err, items) {
                if (!err) {
                    res.json(items);
                } else {
                    console.log('error', err);
                }
            });
        });
    }
});


module.exports = router;
