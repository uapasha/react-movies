var mongoose = require("mongoose");

var movieSchema = {
    title: {type: String, reqired: true},
    year: {type: Number},
    format: {type: String},
    stars: {type: Array}
};

module.exports = new mongoose.Schema(movieSchema);
module.exports.movieSchema = movieSchema;