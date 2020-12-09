var express = require('express');
var router = express.Router();

var User = require('../models/user.js');


/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Welcome' });
  User.getUserByUsername();
});

router.get('/about', ensureAuthenticated, function(req, res, next) {
  User.getUserByUsername();
  res.render('about', { title: 'About Us' });
});

router.get('/members', ensureAuthenticated, function(req, res, next) {
  var users = User.find(function (err, allUsers) {
    if(err) {
        console.log('Error: '  + err);
        return res.redirect('/');
    } else {
        // for(var user in allUsers) {
        //   console.log('User Name: ' + allUsers[user].username);
        // }
        //console.log(JSON.stringify(allUsers, null, 4));
        res.render('members', { title: 'Members', usersData: allUsers });
      }
    });

 });

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
}

function ensureAuthenticatedAndAdmin(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
}


router.get('/admin/edit', ensureAuthenticatedAndAdmin, function(req, res, next) {
  console.log(req.query.username);
  console.log(req.query.newUsername);
  var editUser = User.editUserByUsername(req.query.username, req.query.newUsername, function (err, allUsers) {
    if(err) {
        console.log('Error: '  + err);
        return res.redirect('/');
    } else {
        req.flash('success', 'The User: ' + req.query.username + ' Edit to ' + req.query.newUsername);
        res.redirect('/members');
    }
  });
});

router.get('/admin/delete', ensureAuthenticatedAndAdmin, function(req, res, next) {
  var deleteUser = User.deleteUserByUsername(req.query.username, function (err, allUsers) {
    if(err) {
        console.log('Error: '  + err);
        return res.redirect('/');
    } else {
        req.flash('success', 'The User: ' + req.query.username + ' Deleted.');
        res.redirect('/members');
    }
  });
});

module.exports = router;
