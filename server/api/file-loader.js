var parser = require('../scripts/parser3.js');
var wagner = require('wagner-core');
var models = require('././models')(wagner);

var Movie = models.Movie;

var populate = function(filepath) {

    var data = parser(filepath);

    data.forEach((movie) => {
        // filter out empty objects that results from empty spaces
        // TODO improve parser to deal with empty spaces without creating empty objects
        if(Object.keys(movie).length !== 0 && movie.constructor === Object) {
            var newMovie = new Movie(movie);
            newMovie.save(function (err, newMovie) {
                if (err) return console.error(err);
                //console.log(newMovie);
            });
        }

    });
    // very bad idea.. 
    setTimeout(function() {showMovies()}, 100);
};

var showMovies = function () {
    Movie.find({}, function (error, docs) {
        if(error){
            console.log(error);
            process.exit(1);
        }
  
        console.log('successfully imported '+ docs.length + 'movies');
        process.exit(0);
    })
};

module.exports = populate;