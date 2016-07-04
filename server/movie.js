var mongoose = require("mongoose");

var movieSchema = {
    title: {type: String, required: true},
    year: {type: Number},
    format: {type: String},
    stars: [{type: String}]
};

var schema = new mongoose.Schema(movieSchema);
schema.index({title: 'text'})
module.exports = schema;
module.exports.movieSchema = movieSchema;