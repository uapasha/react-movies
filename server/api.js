var express = require("express");
var status = require("http-status");

module.exports = function(wagner) {
    var api = express.Router();
    
    api.get('/movies/', wagner.invoke(function(Movie) {
        return function(req, res){
            Movie
                .find({})
                .sort({year: 1})
                .exec(function(error, movies){
                    if (error){
                        return res
                            .status(status.INTERNAL_SERVER_ERROR)
                            .json({error: error.toString()});
                    }
                    res.header('Access-Control-Allow-Origin', '*');
                    res.json({movies: movies})
                });
        };
    }));
    
    return api;
}