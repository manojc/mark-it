(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/student-attendance-list', {
                templateUrl: 'partials/student-attendsnce-list.html'
            }).
            when('/student-attendance-list/details/:id', {
                templateUrl: 'partials/student-attendsnce-details.html'
            }).
            when('/new-attendance', {
                templateUrl: 'partials/new-attendance.html'
            }).
            otherwise({
                redirectTo: '/'
            });
        }
    ]);
})(window.app = window.app || {});
