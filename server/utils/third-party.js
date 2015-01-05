var FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    config = require('../config/config'),
    User = require('../models/user'),
    callbackFn = function(accessToken, refreshToken, profile, done) {
        var userObj;
        User.findOne({ oauth: profile.id }, function(err, user) {
            if (!err) {
                if (user === null) {
                    userObj = {
                        name: profile.displayName,
                        email: null,
                        oauth: profile.id,
                        photo: null,
                        network: profile.provider,
                        token: accessToken,
                        created: Date.now()
                    };
                    if (profile.provider == 'facebook') {
                        userObj.email = profile.emails[0].value;
                        userObj.photo = profile.photos[0].value;
                    } else if (profile.provider == 'twitter') {
                        userObj.photo = profile.photos[0].value;
                    } else if (profile.provider == 'google') {
                        userObj.email = profile.emails[0].value;
                        userObj.photo = profile._json.picture;
                    }
                    new User(userObj).save(function(err, user) {
                        if (!err) {
                            return done(null, user);
                        } else {
                            console.log(err);
                        }
                    });
                } else {
                    return done(null,user);
                }
            } else {
                console.log(err);
            }
        });
    },
    serialize = function(user, done) {
        done(null, user._id);
    },
    deserialize = function(id, done) {
        User.findOne({ _id: id }, function(err, user) {
            if (!err) {
                done(null, user);
            } else {
                done(err, null);
            }
        });
    };

module.exports = {
    oauth: {
        facebook: new FacebookStrategy(config.thirdParty.oauth.facebook, callbackFn),
        twitter: new TwitterStrategy(config.thirdParty.oauth.twitter, callbackFn),
        google: new GoogleStrategy(config.thirdParty.oauth.google, callbackFn)
    },
    passport: {
        serialize: serialize,
        deserialize: deserialize
    }
};