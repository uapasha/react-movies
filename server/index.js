var express = require("express");
var wagner = require("wagner-core");
var bodyParser = require('body-parser');


require("./models")(wagner);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
app.use('/api/v1', require("./api")(wagner));

// app.listen(3000);
// console.log('Listening on port 3000!');

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  //var addr = app.address();
  //console.log("Chat server listening at", addr.address + ":" + addr.port);
});