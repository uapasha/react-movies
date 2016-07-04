var express = require("express");
var status = require("http-status");
var multer  =   require('multer');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var limitOptions = {limits: {
  fieldNameSize: 100,
  files: 1,
  fields: 5,
  fileSize: 1000000
}}
var upload = multer({ storage : storage}, limitOptions).single('moviesFile');



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
        .sort({title: 1})
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
            findAllMovies(Movie, res);
        };
    }));

    api.get('/movies/page/:page/', wagner.invoke(function(Movie) {
        return function(req, res){
            var page = req.params.page;
            findPageMovies(Movie, res, page);
        };
    }));
    
    ///// search api /////
    api.get('/movies/search/:query', wagner.invoke(function(Movie) {
        return function(req, res){
            Movie
                .find(
                    { $text: { $search: req.params.query}},
                    { score: { $meta:'textScore'}})
                .sort({score: {$meta: 'textScore'}})
                .limit(10)
                .exec(function(error, movies){
                    if (error){
                        return res
                            .status(status.INTERNAL_SERVER_ERROR)
                            .json({error: error.toString()});
                    }
                    res.json({movies: movies})
                })
        }
    }))

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
    
    api.post('/movies/upload/',function(req,res){
        upload(req,res,function(err) {
            if(err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    });


    api.delete('/movies/delete/:id', wagner.invoke(function (Movie) {
        return function (req, res) {
            var _id = req.params.id;
            Movie.remove({_id: _id}, function (err, removed) {
                if (err) return console.error(err);
            });
            res.json({'status': 'ok'});
            //res.redirect('/movies/');
        }
        }));
    api.get('/movies/delete/:id', wagner.invoke(function (Movie) {
        return function (req, res) {
            res.send('This is for deletion only');
        }
    }));
    
    return api;
};