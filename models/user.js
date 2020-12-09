var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/nodeauth', {useNewUrlParser: true});

var db = mongoose.connection;

// User Schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    name: {
        type: String
    },
    gender: {
        type: String
    },
    daysChecked: {
        type: [Boolean]
    },
    profileimage: {
        type: String
    },
    adminFlag: {
        type: Boolean
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    var query = {username: username};
    User.findOne(query,callback);
}

module.exports.deleteUserByUsername = function(username, callback) {
    var query = {username: username};
    console.log("The user " + username + " deleted");
    User.deleteOne(query,callback);
}

module.exports.editUserByUsername = function(username, newUsername, callback) {
    var query = {username: username.toString()};
    User.updateOne(query, {$set: {username: newUsername.toString()}},callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        callback(null, isMatch);
    });
}

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in our password DB.
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

