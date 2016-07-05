var parser = require('./parser3.js');
var wagner = require('wagner-core');


var path = require('path')
var models = require('../api/models')(wagner);

var data = parser(path.join(__dirname, './', 'sample_movies.txt'));

var Movie = models.Movie;


// Movie.remove({}, function (error) {
//     if(error) {
//         console.log(error);
//         process.exit(1);
//     }
//     populate()
//     });


var populate = function () {

    data.forEach((movie) => {
        // filter out empty objects that results from empty spaces
        // TODO improve parser to deal with empty spaces without creating empty objects
        if (Object.keys(movie).length !== 0 && movie.constructor === Object) {
            var newMovie = new Movie(movie);
            newMovie.save(function (err, newMovie) {
                if (err) {
                    // skip dublicate movies error message
                    if (err.code !== 11000) {
                        return console.error(err)
                    }

                }
                //console.log(newMovie);
            });
        }

    });
    // very bad idea.. 
    setTimeout(function () {
        showMovies()
    }, 100);
};

var showMovies = function () {
    Movie.find({}, function (error, docs) {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        console.log('There are ' + docs.length + 'movies in database now');
        process.exit(0);
    })
};

populate();