var config = require('./config'),
    http = require('http'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    express = require('express');

module.exports = function(db) {
  //create the application 
  var app = express();

  //create a new server for it
  var server = http.createServer(app);

  //parse json requests
  app.use(bodyParser.json());
  //enable X-HTTP-Method-Override
  app.use(methodOverride());

  //load routes
  require('../app/routes/user.js')(app);

  app.use(express.static('./public'));

  return server;
};
