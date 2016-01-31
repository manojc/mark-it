(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.factory('AttendanceReportFactory', ['$http', function($http) {

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
            },
            getAllStudents: function(callback) {
                $http.get('/student/all').success(function(response) {
                    callback(response.data);
                });
            },
            saveAttendance: function(attendanceList, callback) {
                $http.post('/attendance/add-attendance', attendanceList).success(function(response) {
                    callback(response);
                });
            }
        };
    }]);

})(window.app = window.app || {});
