(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider.

        when('/attendance-report', {
            templateUrl: 'partials/attendance/report.html',
            controller: 'AttendanceController',
            controllerAs: 'ctrl'
        }).
        when('/new-attendance', {
            templateUrl: 'partials/attendance/new.html',
            controller: 'AttendanceController',
            controllerAs: 'ctrl'
        }).


        when('/students/add', {
            templateUrl: 'partials/student/new.html',
            controller: 'StudentController',
            controllerAs: 'ctrl'
        }).
        when('/students/all', {
            templateUrl: 'partials/student/list.html',
            controller: 'StudentController',
            controllerAs: 'ctrl'
        }).
        when('/students/:id', {
            templateUrl: 'partials/student/details.html',
            controller: 'StudentController',
            controllerAs: 'ctrl'
        }).


        when('/class-room/add', {
            templateUrl: 'partials/class-room/new.html',
            controller: 'ClassRoomController',
            controllerAs: 'ctrl'
        }).
        when('/class-room/all', {
            templateUrl: 'partials/class-room/list.html',
            controller: 'ClassRoomController',
            controllerAs: 'ctrl'
        }).
        when('/class-room/:id', {
            templateUrl: 'partials/class-room/details.html',
            controller: 'ClassRoomController',
            controllerAs: 'ctrl'
        }).


        when('/profile-details', {
            templateUrl: 'partials/profile/details.html',
            controller: 'ProfileController',
            controllerAs: 'ctrl'
        }).
        when('/register', {
            templateUrl: 'partials/authentication/authentication.html',
            controller: 'AuthenticationController',
            controllerAs: 'ctrl'
        }).
        

        when('/', {
            templateUrl: 'partials/home/home.html',
            controller: 'AuthenticationController',
            controllerAs: 'ctrl'
        }).

        otherwise({
            redirectTo: '/'
        });

    }]);

})(window.app = window.app || {});
