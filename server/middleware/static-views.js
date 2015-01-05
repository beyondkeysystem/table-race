module.exports = function(req, res, next) {
    var baseUrl = '/views/',
        url = req.url.replace(/[^a-z0-9\-\/]/ig, ''), //sanitization
        relativeUrl = url.substring(baseUrl.length);
    if (url.indexOf(baseUrl) === 0) {
        res.render(relativeUrl, {}, function(err, html) {
            if (err) {
                next(err);
            } else {
                res.send(html);
            }
        });
    } else {
        next();
    }
};
