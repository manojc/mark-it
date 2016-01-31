(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.

        when('/attendance-report', {
            templateUrl: 'partials/attendance-report.html',
            controller: 'AttendanceReportController',
            controllerAs: 'ctrl'
        }).

        when('/new-attendance', {
            templateUrl: 'partials/new-attendance.html',
            controller: 'NewAttendanceController',
            controllerAs: 'ctrl'
        }).


        when('/students/add', {
            templateUrl: 'partials/new-student.html',
            controller: 'NewStudentController',
            controllerAs: 'ctrl'
        }).

        when('/students/all', {
            templateUrl: 'partials/student-list.html',
            controller: 'StudentListController',
            controllerAs: 'ctrl'
        }).

        when('/students/:id', {
            templateUrl: 'partials/student-details.html',
            controller: 'StudentDetailsController',
            controllerAs: 'ctrl'
        }).

        otherwise({
            redirectTo: '/'
        });
    }]);

})(window.app = window.app || {});
