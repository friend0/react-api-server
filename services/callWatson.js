var alchemyApi = require('./alchemyApi');
var toneAnalyzer = require('./toneAnalyzer');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb://heroku_0jpj3dmf:5p0ubcg0cu08032qjbkmu226us@ds017896.mlab.com:17896/heroku_0jpj3dmf";


function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        rv[i] = arr[i];
    return rv;
}

function watson(obj) {
    alchemyApi(obj.article.url, function(langRes) {
        var arr = [];
        obj.sentiment={};
        arr.push(langRes.docSentiment);
        obj.sentiment = arr;
        obj.emotions = [langRes.docEmotions];

        langRes.entities.map(function(item){
            obj.subject = {text:item.text, count:item.count, relevance:item.relevance};
            obj.subject_sentiment = item.sentiment;
            obj.subject_emotions = item.emotions;
            //var entity = {text:item.text, count:item.count, relevance:item.relevance, sentiment:item.sentiment, emotions:item.emotions};

        });
    }, function(textRes) {
        toneAnalyzer(textRes, function(toneRes) {
            var authorTone = JSON.parse(toneRes);
            var _tone = authorTone.document_tone.tone_categories;
            var name = _tone[1].tones[0].tone_name;
            obj.emotional_tone = {
                [_tone[0].tones[0].tone_id]: _tone[0].tones[0].score,
                [_tone[0].tones[1].tone_id]: _tone[0].tones[1].score,
                [_tone[0].tones[2].tone_id]: _tone[0].tones[2].score,
                [_tone[0].tones[3].tone_id]: _tone[0].tones[3].score,
                [_tone[0].tones[4].tone_id]: _tone[0].tones[4].score
            }

            obj.language_tone = {
                [_tone[1].tones[0].tone_id]: _tone[1].tones[0].score,
                [_tone[1].tones[1].tone_id]: _tone[1].tones[1].score,
                [_tone[1].tones[2].tone_id]: _tone[1].tones[2].score,
            };
            obj.social_tone = {
                [_tone[2].tones[0].tone_name]: _tone[2].tones[0].score,
                [_tone[2].tones[1].tone_name]: _tone[2].tones[1].score,
                [_tone[2].tones[2].tone_name]: _tone[2].tones[2].score,
                [_tone[2].tones[3].tone_name]: _tone[2].tones[3].score,
                [_tone[2].tones[4].tone_name]: _tone[2].tones[4].score
            };
           // console.log(obj);
            var insertDocument = function(db, callback) {
                db.collection('home').insertOne(obj, function(err, result) {
                    assert.equal(err, null);
                    console.log("Inserted a document into the ny times home collection.");
                    callback();
                });
            };

            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                insertDocument(db, function() {
                    db.close();
                });
            });
        });
    });
}

module.exports = watson;