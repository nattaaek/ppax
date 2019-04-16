var mongojs = require('mongojs');

var databaseUrl = 'db';
var collections = ['reservation'];

var connect = mongojs(databaseUrl,collections);

module.exports = {
    connect: connect
};