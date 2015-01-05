(function() {

    'use strict';

    angular.module('config.routes', [])
        .provider('Routes', [
            function() {

                var accessLevels = {
                    'public': [ ],
                    'user': ['user'],
                    'admin': ['user', 'admin']
                };

                var routes = [
                    /* ***************** Public ***************** */
                    {
                        'url': '/error/:error',
                        'template': '/views/partials/pages/error',
                        'controller': 'Error',
                        'roles': accessLevels['public']
                    },
                    {
                        'url': '/login',
                        'template': '/views/partials/pages/login',
                        'controller': 'Login',
                        'roles': accessLevels['public']
                    },
                    /* ***************** User ***************** */
                    {
                        'url': '/',
                        'template': '/views/partials/pages/index',
                        'controller': 'Index',
                        'roles': accessLevels['user']
                    },
                    {
                        'url': '/users',
                        'template': '/views/partials/pages/users',
                        'controller': 'Users',
                        'roles': accessLevels['user']
                    },
                    {
                        'url': '/profile/:userId',
                        'template': '/views/partials/pages/profile',
                        'controller': 'Profile',
                        'roles': accessLevels['user']
                    },
                    {
                        'url': '/logout',
                        'template': '/views/partials/pages/logout',
                        'controller': 'Logout',
                        'roles': accessLevels['public']
                    }
                ];

                this.getRoutes = function() {
                    return routes;
                };

                this.$get = function() {
                    return {
                        accessLevels: accessLevels,
                        routes: routes
                    };
                };
            }
        ]);
})();
