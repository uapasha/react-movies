var parser = require('../scripts/parser3.js');

var populate = function(filepath, Movie) {
    
    var data = parser(filepath);

    data.forEach((movie) => {
        // filter out empty objects that results from empty spaces
        // TODO improve parser to deal with empty spaces without creating empty objects
        if(Object.keys(movie).length !== 0 && movie.constructor === Object) {
            
            var newMovie = new Movie(movie);
            
            newMovie.save(function (err, newMovie) {
                if (err) {
                    
                    // skip dublicate movies error message
                    if (err.code !== 11000){
                        return console.error(err)
                    }  
                    
                }
            });
        }

    });

};

module.exports = populate;