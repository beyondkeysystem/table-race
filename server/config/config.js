module.exports = {
    server: {
        port: 5000
    },
    view: {
        path: 'client/views',
        static: 'client/public',
        engine: 'jade'
    },
    mongo: {
        host: "127.0.0.1",
        port: 27017,
        db: "table-race"
    },
    redis: {
        host: "127.0.0.1",
        port: 6379,
        db: 4
    },
    session: {
        secret: "38-g/#L5xhc+Q=WSZbGu@M/zHe6P1vg(=jM$cwF1",
        key: "sp.sid",
        timeout: 60 * 1000 //1 minute
    },
    thirdParty: {
        oauth: {
            facebook: {
                clientID: '1994275844046463',
                clientSecret: 'cf8af37bfa3cfecc5fd41b7df20f9c1e',
                callbackURL: 'http://localhost:5000/auth/facebook/callback',
                profileFields: ['id', 'displayName', 'link', 'photos', 'emails']
            },
            twitter: {
                consumerKey: '8s9ypuMDPEpUXvj16vMSwdcrG',
                consumerSecret: 'Yoqll019IJfOJSKQCXfhtqXgDhIggXIjOEUykFjKlbEUQgslfl',
                callbackURL: 'http://localhost:5000/auth/twitter/callback'
            },
            google: {
                clientID: '834820852035-mdqgqeuo65ahgo5j3u35u01v3rg7ga56.apps.googleusercontent.com',
                clientSecret: 'rfZTorFi6cmDclPu3iRHKF2H',
                callbackURL: 'http://localhost:5000/auth/google/callback'
            }
        }
    }
};