var watson = require('watson-developer-cloud');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

function analyzeTone (text, toneFn) {
    var tone_analyzer = new ToneAnalyzerV3({
        username: 'bc28470a-c874-4d1e-a9a7-2a88998b3559',
        password: 'kqgqAEWgUqHy',
        version_date: '2016-05-19'
    });

    var params = {
        text: text,
        sentences: false
    };

    tone_analyzer.tone(params, function(err, tone) {
            if (err)
                console.log(err);
            else
                var str = JSON.stringify(tone, null, 2);
                toneFn(str);
        });
}

module.exports = analyzeTone;