var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
  
  //connect to db
  var db = mongoose.connect(config.db);

  //load models
  require('../app/models/user');

  //return db
  return db;
};
