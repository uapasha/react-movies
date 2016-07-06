var express = require("express");
var status = require("http-status");
var path = require('path');
var upload = require('./file-upload.js');
var fs = require('fs');
var populate = require('./file-loader.js');

/////  helpers functions /////
var findAllMovies = function (Movie, res) {
    Movie
        .find({})
        .sort({year: 1})
        .exec(function (error, movies) {
            if (error) {
                return res
                    .status(status.INTERNAL_SERVER_ERROR)
                    .json({error: error.toString()});
            }
            res.json({movies: movies})
        });
};

var findPageMovies = function (Movie, res, page) {
    Movie
        .find({})
        .sort({title: 1})
        .skip((page - 1) * 20)
        .limit(page * 20)
        .exec(function (error, movies) {
            if (error) {
                return res
                    .status(status.INTERNAL_SERVER_ERROR)
                    .json({error: error.toString()});
            }
            res.json({movies: movies})
        });
};


///// API /////
module.exports = function (wagner) {
    var api = express.Router();

    ///// all movies /////
    api.get('/movies/', wagner.invoke(function (Movie) {
        return function (req, res) {
            findAllMovies(Movie, res);
        };
    }));

    ///// movies by page /////
    api.get('/movies/page/:page/', wagner.invoke(function (Movie) {
        return function (req, res) {
            var page = req.params.page;
            findPageMovies(Movie, res, page);
        };
    }));

    ///// search for movies /////
    api.get('/movies/search/:query', wagner.invoke(function (Movie) {
        return function (req, res) {
            Movie
                .find(
                    {$text: {$search: req.params.query}},
                    {score: {$meta: 'textScore'}})
                .sort({score: {$meta: 'textScore'}})
                .limit(10)
                .exec(function (error, movies) {
                    if (error) {
                        return res
                            .status(status.INTERNAL_SERVER_ERROR)
                            .json({error: error.toString()});
                    }
                    res.json({movies: movies})
                })
        }
    }));

    ///// add movie /////
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

    ///// upload file /////
    api.post('/movies/upload/', wagner.invoke(function (Movie) {
        return function (req, res) {
            upload(req, res, function (err) {

                if (err) {
                    res.json({fail: true});
                    return res.end("Error uploading file.");
                }

                var file = req.file;

                populate(file.path, Movie);

                res.json({fail: false});
                res.end("File is uploaded");
            });
        };
    }));

    ///// delete movie /////
    api.delete('/movies/delete/:id', wagner.invoke(function (Movie) {
        return function (req, res) {
            var _id = req.params.id;
            Movie.remove({_id: _id}, function (err, removed) {
                if (err) return console.error(err);
            });
            res.json({'status': 'ok'});

        }
    }));
    ///// if delete send with get /////
    api.get('/movies/delete/:id', wagner.invoke(function (Movie) {
        return function (req, res) {
            res.send('This is for DELETE requests only');
        }
    }));

    return api;
};