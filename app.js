/**
 * Module dependencies.
 */
var express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    passport = require('passport'),
    mongoose = require('mongoose'),
    RedisStore = require('connect-redis')(express),
    config = require('./server/config/config'),
    routes = require('./server/config/routes'),
    keepSessionAliveMW = require('./server/middleware/keep-session-alive'),
    staticViewsMW = require('./server/middleware/static-views'),
    router = require('./server/utils/router'),
    thirdParty = require('./server/utils/third-party');

mongoose.connect("mongodb://" + config.mongo.host + ":" + config.mongo.port + "/" + config.mongo.db);

// all environments
app.set('port', process.env.PORT || config.server.port);
app.set('views', path.join(__dirname, config.view.path));
app.set('view engine', config.view.engine);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.cookieParser());
app.use(express.session({
    key: config.session.key,
    secret: config.session.secret,
    cookie: {maxAge: config.session.timeout},
    store: new RedisStore(config.redis)
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(keepSessionAliveMW);
app.use(staticViewsMW);
app.use(app.router);
app.use(require('less-middleware')(path.join(__dirname, config.view.static)));
app.use(express.static(path.join(__dirname, config.view.static)));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

passport.use(thirdParty.oauth.facebook);
passport.use(thirdParty.oauth.twitter);
passport.use(thirdParty.oauth.google);

passport.serializeUser(thirdParty.passport.serialize);
passport.deserializeUser(thirdParty.passport.deserialize);

router.map(app, routes);

http.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
