var parser = require('./parser3.js');
var wagner = require('wagner-core');

var path = require('path')
var models = require('../api/models')(wagner);

// load data
var data = parser(path.join(__dirname, './', 'sample_movies.txt'));

var Movie = models.Movie;

var populate = function () {

    data.forEach((movie) => {
        // filter out empty objects that results from empty spaces
        //TODO improve parser to deal with empty spaces without creating empty objects
        if (Object.keys(movie).length !== 0 && movie.constructor === Object) {
            var newMovie = new Movie(movie);
            newMovie.save(function (err, newMovie) {
                if (err) {
                    // skip dublicate movies error message
                    if (err.code !== 11000) {
                        return console.error(err)
                    }
                }
            });
        }
    });
    // very bad idea.. but the best I was able to came up with for now
    setTimeout(function () {
        showMovies()
    }, 1000);
};

var showMovies = function () {
    Movie.find({}, function (error, docs) {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        console.log('There are ' + docs.length + ' movies in database now');
        process.exit(0);
    })
};

populate();