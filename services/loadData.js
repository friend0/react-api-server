var callWatson = require('./callWatson');

function loadData(req, res) {
    var now = new Date().toLocaleString();
    console.log(req.body);
    var reqData = req.body.items.map(function (value) {
        var article = {article:{url:value.id, createdAt:now, title:value.title, author:value.actor.id}}
        callWatson(article);
    });
}

module.exports = loadData;
