var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var roles = ['root','admin','user','guest'];

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    validate: [
      function(password) {
        return (password && password.length > 6);
      }, 'Password length should be at least 6 characters'
    ]
  },
  salt: {
    type: String
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Invalid email address"]
  },
  role: {
    type: String,
    default: 'user',
    validate: [
      function(role) {
        return roles.indexOf(role) !== -1;
      },'Accepted roles are: '+roles.join(', ')
    ]
  }
});

UserSchema.pre('save', function(next) {
  if(this.password) {
    this.salt = new Buffer(
        crypto.randomBytes(16).toString('base64'),
        'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64)
               .toString('base64');
};

UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

UserSchema.statics.nameExists = function(name, callback) {
  var self = this;

  this.findOne({
    username: name
  }, function(err, user) {
    if(!err) {
      callback(Boolean(user));
    }
    else {
      callback(null);
    }
  });
};

UserSchema.set('toJSON', {
  getters: true,
  setters: true
});

mongoose.model('User', UserSchema);
