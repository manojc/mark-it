(function(window, $, undefined) {

    'use strict';

    var app = angular.module('mark-it', ['ngRoute']);

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

    app.factory('AttendanceReportModel', ['$http', function($http) {

        var self = this;

        return {
            getAattendanceReport: function(callback) {
                $http.get('/attendance/all').success(function(response) {
                    callback(response.data);
                });
            },
            getStudentDetails: function(id, callback) {
                $http.get('/student?id=' + id).success(function(response) {
                    callback(response.data);
                });
            }
        };

    }]);

    app.controller('AttendanceReportController', ['AttendanceReportModel', function(attendanceReportModel) {

        var self = this;

        self.Collection = [];

        attendanceReportModel.getAattendanceReport(function(collection) {
            self.Collection = collection;
        });

        self.removeFirstRow = function() {
            self.Collection.shift();
        };
        self.removeSelectedRow = function(a) {
            var index = self.Collection.indexOf(a);
            if (index > -1)
                self.Collection.splice(index, 1);
        };
    }]);

    app.controller('StudentAttendsnceDetailsController', ['AttendanceReportModel', '$routeParams', function(attendanceReportModel, $routeParams) {

        var self = this;

        self.model = {};

        attendanceReportModel.getStudentDetails($routeParams.id, function(response) {
            self.model = response;
        });

        self.getClassName = function() {
            return self.model.Class + ' (' + self.model.Division + ')';
        };
    }]);
})(window, jQuery);
