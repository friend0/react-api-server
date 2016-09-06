// make localhost publically available
const localtunnel = require('localtunnel');
var tunnel = localtunnel(3000, {subdomain : 'rileyroodle'}, function(err, tunnel) {
    console.log(tunnel.url);
    tunnel.url;
});

module.exports = tunnel;
