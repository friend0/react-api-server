var watson = require('watson-developer-cloud');
var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');

function alchemyApi(url, langFn, textFn) {
    var alchemy_language = new AlchemyLanguageV1({
        api_key: 'a852c59ccf2e5e7b9aad1bfc4d13d99097140c49'
    });
    var combinedParams = {
        url: url,
        extract: 'entities,doc-emotion,doc-sentiment',
        sentiment: 1,
        emotion: 1,
        maxRetrieve: 1,
        showSourceText: true
    };
    var textParams = {
        url:url,
    };

    alchemy_language.combined(combinedParams, function (err, response) {
        if (err)
            console.log('error:', err);
        else
            var str = JSON.stringify(response, null, 2);
            var langResponse = JSON.parse(str);
            langFn(langResponse);
    });

    alchemy_language.text(textParams, function (err, response) {
        if (err)
            console.log('error:', err);
        else
            var str = JSON.stringify(response, null, 2);
           // var textResponse = JSON.parse(str);
            textFn(str);
    });
}

module.exports = alchemyApi;