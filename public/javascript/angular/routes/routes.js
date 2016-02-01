(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.

        when('/attendance-report', {
            templateUrl: 'partials/attendance-report.html',
            controller: 'AttendanceController',
            controllerAs: 'ctrl'
        }).
        when('/new-attendance', {
            templateUrl: 'partials/new-attendance.html',
            controller: 'AttendanceController',
            controllerAs: 'ctrl'
        }).


        when('/students/add', {
            templateUrl: 'partials/new-student.html',
            controller: 'StudentController',
            controllerAs: 'ctrl'
        }).
        when('/students/all', {
            templateUrl: 'partials/student-list.html',
            controller: 'StudentController',
            controllerAs: 'ctrl'
        }).
        when('/students/:id', {
            templateUrl: 'partials/student-details.html',
            controller: 'StudentController',
            controllerAs: 'ctrl'
        }).


        when('/class-room/add', {
            templateUrl: 'partials/new-class-room.html',
            controller: 'ClassRoomController',
            controllerAs: 'ctrl'
        }).
        when('/class-room/all', {
            templateUrl: 'partials/class-room-list.html',
            controller: 'ClassRoomController',
            controllerAs: 'ctrl'
        }).
        when('/class-room/:id', {
            templateUrl: 'partials/class-room-details.html',
            controller: 'ClassRoomController',
            controllerAs: 'ctrl'
        }).

        otherwise({
            redirectTo: '/'
        });
    }]);

})(window.app = window.app || {});
