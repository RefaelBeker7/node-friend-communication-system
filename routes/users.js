var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', {title:'Register'});
});

router.get('/login', function(req, res, next) {
  console.log()
  res.render('login', {title:'Login'});
});

router.post('/login', 
  passport.authenticate('local',{failureRedirect:'/users/login', failureFlash: 'Invalid username or password.'}),
  function(req, res) {
    req.flash('success', 'You are now logged in.');
    res.redirect('/');
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.getUserByUsername(username, function(err, user){
    if (err) throw err;
    if (!user) {
      return done(null, false, {message: 'Unknow User.'});
    }
    User.comparePassword(password, user.password, function(err, isMatch) {
      if (err) return done(err);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid Password.'});
      }
    });
  });
}));

router.post('/register', upload.single('profileimage'), function(req,res, next) {
  var name = req.body.name;
  var phone = req.body.phone;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var gender = req.body.gender;
  var daysOfWeek = req.body.daysOfWeek;
  var daysChecked = [false, false, false, false, false, false, false];
  
  if (daysOfWeek) {
    daysOfWeek.toString().split(',');
    for (var i = 0; i < daysOfWeek.length; i++) {
      daysChecked[daysOfWeek[i]] = true;
    }
  }

  if(req.file) {
    console.log('Uploading File...');
    var profileimage = req.file.filename;
  } else {
    console.log('No File Uploaded.');
    var profileimage = 'noimage.jpg';
  }

  // Form Validator
  req.checkBody('name', 'Name field is required.').notEmpty();
  req.checkBody('phone', 'Phone number field is required.').notEmpty();
  req.checkBody('phone', 'Phone number is not valid.').isMobilePhone();
  req.checkBody('username', 'Username field is required.').notEmpty();
  req.checkBody('password', 'Password field is required.').notEmpty();
  req.checkBody('password2', 'Passwords are not equals.').equals(password);
  req.checkBody('gender', 'Gender field is required.').notEmpty();
  req.checkBody('daysOfWeek', 'Days field is required.').notEmpty();


  // Check Errors
  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors
    });
  } else {
    var newUser = new User({
      name: name,
      phone: phone,
      username: username,
      password: password,
      gender: gender,
      daysChecked: daysChecked,
      profileimage: profileimage,
      adminFlag: false
    });
    User.createUser(newUser, function(err, user) {
      if(err) throw err;
      console.log(user);
    });

    req.flash('success', 'You are now register and can login.');
    res.location('/');
    res.redirect('/');
  }
});

router.get('/logout', function(req, res){
  req.logout();
  res.clearCookie('connect.sid');
  req.flash('success', 'You are now logged out.');
  res.redirect('/users/login');
});

module.exports = router;
