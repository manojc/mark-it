(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/student-attendsnce-list', {
                templateUrl: 'partials/student-attendsnce-list.html'
            }).
            when('/student-attendsnce-list/details/:id', {
                templateUrl: 'partials/student-attendsnce-details.html'
            }).
            otherwise({
                redirectTo: '/'
            });
        }
    ]);
})(window.app = window.app || {});
