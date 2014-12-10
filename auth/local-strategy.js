﻿var passport = module.parent.exports.passport,
    LocalStrategy = require('passport-local').Strategy,
    Admins = require('../models/admins.js'),
    Users = require('../models/users.js');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use('AdminLogin', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
  function (username, password, done) {
        Admins.findOne({ email: username }, function (err, adm) {
            if (err) { return done(err); }
            if (!adm) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!adm.authenticate(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, adm);
        });
    }
));

passport.use('UserLogin', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
  function (username, password, done) {
        Users.findOne({ email: username }, function (err, usr) {
            if (err) { return done(err); }
            if (!usr) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!usr.authenticate(password)) {
                return done(null, false, { message: 'Your password is incorrect.' });
            }
            return done(null, usr);
        });
    }
));