module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        req.session.lastAccess = Date.now();
    }
    next();
};
