//first think to do on the server, is check the environment
//and if it's not set, then we manually set it to 'development'.

if(!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

var express = require('./config/express'),
    mongoose = require('./config/mongoose');

var db = mongoose();

var app = express(db);

if(process.env.NODE_ENV !== 'test') {
  app.listen(3000);
}

console.log('Server running at http://localhost:3000/');

module.exports = app;
