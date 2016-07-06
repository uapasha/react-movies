var express = require("express");
var wagner = require("wagner-core");
var bodyParser = require('body-parser');
var path = require('path');

require("./api/models")(wagner);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../', 'client')));

// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
    // if runing cliend on a different IP
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');

    // Disable caching so we'll always get the latest movies.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// api
app.use('/api/v1', require("./api/api")(wagner));

// homepage
app.use('', require("./api/homepage")());

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    console.log('Listening on requests..');
});