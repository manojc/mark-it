(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.factory('AttendanceReportFactory', ['$http', function($http) {

        var self = this;

        return {
            getAattendanceReport: function(callback) {
                $http.get('/attendance/all').then(function(response) {
                    callback(response.data.data);
                }, function(a, b, c) {
                    throw Error("/attendance/all call failed");
                });
            },
            getStudentDetails: function(id, callback) {
                $http.get('/student?id=' + id).then(function(response) {
                    callback(response.data.data);
                }, function(a, b, c) {
                    throw Error('/student?id=' + id + ' call failed');
                });
            },
            getAllStudents: function(callback) {
                $http.get('/student/all').then(function(response) {
                    callback(response.data.data);
                }, function(a, b, c) {
                    throw Error("/student/all call failed");
                });
            },
            saveAttendance: function(attendanceList, callback) {
                $http.post('/attendance/add-attendance', attendanceList).then(function(response) {
                    callback(response.data.data);
                }, function(a, b, c) {
                    throw Error("/attendance/add-attendance call failed");
                });
            },
            saveStudents: function(studentList, callback) {
                $http.post('/student/add-student', studentList).then(function(response) {
                    callback(response.data.data);
                }, function(a, b, c) {
                    throw Error("/attendance/add-attendance call failed");
                });
            }
        };
    }]);

})(window.app = window.app || {});
