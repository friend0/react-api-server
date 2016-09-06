const express = require('express');
const fs = require('fs');
const sqlite = require('sql.js');

const bodyParser = require('body-parser');
const localtunnel = require('./services/localtunnel');
const loadData = require('./services/loadData');
const api = require('./api');

const filebuffer = fs.readFileSync('db/usda-nnd.sqlite3');

const db = new sqlite.Database(filebuffer);

const app = express();

app.set('port', (process.env.API_PORT || 3001));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);
app.post("/callback", function(req, res) {
  loadData(req, res); // services/loadData.json
  res.json(req.body);
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
})
