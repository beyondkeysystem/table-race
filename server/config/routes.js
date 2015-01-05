var passport = require('passport'),
    User = require('../models/user'),
    ensureAuthentication = function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            if (req.xhr) {
                return res.send(401, {status: 401, message: 'Not Authenticated'});
            } else {
                return res.redirect(401, '/#/login');
            }
        }
    };

module.exports = {
    '/': {
        get: function(req, res) {
            res.render('index');
        }
    },
    '/user': {
        get: [
            ensureAuthentication,
            function(req, res) {
                User.find({}, function(err, users) {
                    res.json(users);
                });
            }
        ],
        /*
        // user saved via passport oauth
        'post': function(req, res) {
            new User({
                oauth: req.body.oauth,
                name: req.body.name,
                created: Date.now()
            }).save(function(err, user) {
                    res.json(user);
                });
        },
        'put': function(req, res) {
            User.update(
                {_id: req.params.id},
                {phone: req.body.phone, address: req.body.address},
                function(err, user) {
                    res.json(user);
                }
            );
        },
        'delete': function(req, res) {
            User.remove({_id: req.params.id}, function(err, user) {
                res.json(user);
            });
        },
        */
        '/session': {
            get: function(req, res) {
                res.json(req.user);
            }
        },
        '/expiration-date': {
            get: [
                ensureAuthentication,
                function(req, res) {
                    res.json({expires: req.session.cookie._expires});
                }
            ]
        },
        '/logout': {
            get: [
                ensureAuthentication,
                function(req, res) {
                    req.logout();
                    res.json({result: true});
                }
            ]
        },
        '/:id': {
            get: [
                ensureAuthentication,
                function(req, res) {
                    User.findOne({ _id: req.params.id }, function(err, user) {
                        res.json(user);
                    });
                }
            ]
        }
    },
    '/auth': {
        '/facebook': {
            get: [
                passport.authenticate('facebook', { scope: ['email'] }),
                function(req, res) {
                }
            ],
            '/callback': {
                get: [
                    passport.authenticate('facebook'),
                    function(req, res) {
                        process.nextTick(function() {
                            res.redirect('/#/');
                        });
                    }
                ]
            }
        },
        '/twitter': {
            get: [
                passport.authenticate('twitter'),
                function(req, res) {
                }
            ],
            '/callback': {
                get: [
                    passport.authenticate('twitter'),
                    function(req, res) {
                        process.nextTick(function() {
                            res.redirect('/#/');
                        });
                    }
                ]
            }
        },
        '/google': {
            get: [
                passport.authenticate('google', { scope: [
                    'https://www.googleapis.com/auth/userinfo.profile',
                    'https://www.googleapis.com/auth/userinfo.email'
                ]}),
                function(req, res) {
                }
            ],
            '/callback': {
                get: [
                    passport.authenticate('google'),
                    function(req, res) {
                        process.nextTick(function() {
                            res.redirect('/#/');
                        });
                    }
                ]
            }
        }
    }
};