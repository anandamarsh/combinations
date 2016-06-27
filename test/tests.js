var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe('Testing number of combinations', function() {

    var url = 'http://localhost:3000/test';

    describe('Positive Tests', function() {
        it('should return 1296 combinations for two digit passwords', function(done) {
            request(url).get('?min_places=2&max_places=2')
                .end(function(err, res) {
                    if (err) { throw err; }
                    should.equal(res.body.noOfComb,1296);
                    done();
                });
        });
        it('should return 1727568 combinations for four digit passwords', function(done) {
            request(url).get('?min_places=2&max_places=4')
                .end(function(err, res) {
                    if (err) { throw err; }
                    should.equal(res.status, 200);
                    should.equal(res.body.noOfComb,1727568);
                    done();
                });
        });
    });

    describe('Negative Tests', function() {
        it('should return 500 status code if params are missing', function(done) {
            request(url).get('')
                .end(function(err, res) {
                    if (err) { throw err; }
                    should.equal(res.status, 500);
                    done();
                });
        });
        it('should return 500 status code if max_places < min_places', function(done) {
            request(url).get('?min_places=4&max_places=2')
                .end(function(err, res) {
                    if (err) { throw err; }
                    should.equal(res.status, 500);
                    done();
                });
        });
    });

});