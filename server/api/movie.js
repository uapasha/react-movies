var mongoose = require("mongoose");

var movieSchema = {
    title: {type: String, unique : true, required : true, dropDups: true},
    year: {type: Number},
    format: {type: String},
    stars: [String]
};

var schema = new mongoose.Schema(movieSchema);

schema.index({
    title: 'text', 
    stars:'text'
});

module.exports = schema;
module.exports.movieSchema = movieSchema;