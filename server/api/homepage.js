var path = require('path');
var express = require("express");

module.exports = function () {
    var api = express.Router();
    api.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../client', 'index.html'));
    });
    return api;
};