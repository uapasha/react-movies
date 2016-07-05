var mongoose = require("mongoose");

module.exports = function (wagner) {
    mongoose.connect('mongodb://localhost:27017/test');

    var Movie = mongoose.model('Movie', require("./movie"), 'movies');

    wagner.factory('Movie', function () {
        return Movie;
    });

    return {
        Movie: Movie
    };
};