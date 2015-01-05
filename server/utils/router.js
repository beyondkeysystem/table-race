var map = function(app, routes, url) {
    var key;
    url = url || '';
    for (key in routes) {
        if (routes.hasOwnProperty(key)) {
            switch (typeof routes[key]) {
                case 'object':
                    if(routes[key].length == 2){
                        app[key](url, routes[key][0], routes[key][1]);
                    } else {
                        map(app, routes[key], url + key);
                    }
                    break;
                case 'function':
                    app[key](url, routes[key]);
                    break;
            }
        }
    }
};

exports.map = map;
