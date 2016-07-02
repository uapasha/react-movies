var parser = require('./parser3.js');
var wagner = require('wagner-core');

var models = require('./models')(wagner);

var data = parser();

//console.log('data');

//console.log(data);

var Movie = models.Movie;


Movie.remove({}, function (error) {
    if(error) {
        console.log(error);
        process.exit(1);
    }
    }).then(() => {

        data.forEach((movie) => {
            var newMovie = new Movie(movie);
            newMovie.save(function (err, newMovie) {
                if (err) return console.error(err);
                //console.log(movie);
            })
        });

        Movie.find().exec(function (error, docs) {
            if(error){
                console.log(error);
                process.exit(1);
            }
            console.log('found movies');
            docs.forEach((movie) => {
                console.log(JSON.stringify(movie))
            });

        })
    }).then(process.exit(0));
