var parser = require('./parser3.js');
var wagner = require('wagner-core');

var models = require('./models')(wagner);

var data = parser('./sample_movies (1).txt');

//console.log('data');

//console.log(data);

var Movie = models.Movie;


// Movie.find().exec(function (error, docs) {
//     if (error) {
//         console.log(error);
//         process.exit(1);
//     }
//     console.log('found movies');
//     docs.forEach((movie) => {
//         console.log(JSON.stringify(movie))
//     });
// });


Movie.remove({}, function (error) {
    if(error) {
        console.log(error);
        process.exit(1);
    }
    populate()
    });

var populate = function () {
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
    showMovies();
};

var showMovies = function () {
        Movie.find({}, function (error, docs) {
            if(error){
                console.log(error);
                process.exit(1);
            }
            // console.log('found movies');
            // docs.forEach((movie) => {
            //     console.log(JSON.stringify(movie))
            // });
            console.log('successfully imported '+ docs.length + 'movies');
            process.exit(0)
        })
};

//    .then(process.exit(0))
    // .then(()=>{
    //     Movie.find().exec(function (error, docs) {
    //         if(error){
    //             console.log(error);
    //             process.exit(1);
    //         }
    //         console.log('found movies');
    //         docs.forEach((movie) => {
    //             console.log(JSON.stringify(movie))
    //         });
    //
    //     })
    // })
