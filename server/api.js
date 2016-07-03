var express = require("express");
var status = require("http-status");

var findAllMovies = function(Movie, res){
    Movie
        .find({})
        .sort({year: 1})
        .exec(function(error, movies){
            if (error){
                return res
                    .status(status.INTERNAL_SERVER_ERROR)
                    .json({error: error.toString()});
            }
            res.json({movies: movies})
        });
};

var findPageMovies = function(Movie, res, page){
    Movie
        .find({})
        .sort({year: 1})
        .skip((page-1)*20)
        .limit(page*20)
        .exec(function(error, movies){
            if (error){
                return res
                    .status(status.INTERNAL_SERVER_ERROR)
                    .json({error: error.toString()});
            }
            res.json({movies: movies})
        });
};

module.exports = function(wagner) {
    var api = express.Router();

    api.get('/movies/', wagner.invoke(function(Movie) {
        return function(req, res){
            findAllMovies(Movie, res, page);
        };
    }));

    api.get('/movies/page/:page/', wagner.invoke(function(Movie) {
        return function(req, res){
            var page = req.params.page;
            findPageMovies(Movie, res, page);
        };
    }));

    api.post('/movies/', wagner.invoke(function (Movie) {
        return function (req, res) {
            var movie = req.body;
            var newMovie = new Movie(movie);
            newMovie.save(function (err, newMovie) {
                if (err) return console.error(err);
            });
            findAllMovies(Movie, res);
        }
    }));

    api.delete('/movies/:id', wagner.invoke(function (Movie) {
        return function (req, res) {
            var _id = req.perams.id;
            Movie.remove({_id:_id});
            findAllMovies();
        }
    }));
    
    return api;
};