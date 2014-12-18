var mongoose = require('mongoose'),
    User = mongoose.model('User');

//list, create, read, update, delete
exports.list = function(req, res) {
  User.find({}, function(err, users) {
    if(err) {
      return res.status(500).send({
        message: err
      });
    }
    else {
      res.json(users);
    }
  });
};

exports.create = function(req, res) {
  res.json({name: 'test'}); 

};

exports.read = function(req, res) {


};

exports.update = function(req, res) {


};

exports.remove = function(req, res) {


};
