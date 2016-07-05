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
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
app.use('/api/v1', require("./api/api")(wagner));

app.use('', require("./api/homepage")());

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {

    console.log('Listening on port 3000!');
});