var assert = require('assert');
var express = require('express');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';

var server;
var Movie;

describe('Movie API', function () {

    before(function () {
        var app = express();

        //Bootstrap server
        models = require('../api/models.js')(wagner);

        app.use(require("../api/api")(wagner));

        server = app.listen(3000);

        // Make Movie category available in tests
        Movie = models.Movie;
        console.log(Movie);

    });
    after(function () {
        //Shut the server when we're done
        server.close();
    });

    beforeEach(function (done) {
        // Make sure movies are empty before each test
        Movie.remove({}, function (error) {
            assert.ifError(error);
            done();
        });
    });
});
it('can load movies', function (done) {
    // Create a single movie
    Movie.create({title: 'Six Senses'}, function (error, doc) {
        assert.ifError(error);
        var url = URL_ROOT + '/movies/';
        // Maje an HTTP request to localhost:3000/movies/
        superagent.get(url, function (error, res) {
            assert.ifError(error);
            var result;
            // and make sure we get {movies: {name: "Six senses"} back
            assert.doesNotThrow(function () {
                result = JSON.parse(res.text);
            });
            assert.ok(result.movies);
            assert.equal(result.movies[0].title, "Six Senses");
            done();
        });
    });
});