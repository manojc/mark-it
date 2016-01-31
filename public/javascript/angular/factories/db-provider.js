(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");


    app.factory('ScopesFactory', function($rootScope) {
        var mem = {};

        return {
            store: function(key, value) {
                mem[key] = value;
            },
            get: function(key) {
                return mem[key];
            }
        };
    });

    app.factory('AttendanceReportFactory', ['$http', 'ScopesFactory', function($http, scopesFactory) {

        var self = this;

        self.NotificationResponse = {};

        return {
            getAattendanceReport: function(callback) {
                $http.get('/attendance/all').then(function(response) {
                    callback(response.data.data);
                }, function(a, b, c) {
                    throw Error("/attendance/all call failed");
                });
            },
            saveAttendance: function(attendanceList, callback) {
                $http.post('/attendance/add-attendance', attendanceList).then(function(response) {
                    callback(response.data.data);
                }, function(a, b, c) {
                    throw Error("/attendance/add-attendance call failed");
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
            saveStudents: function(studentList, callback) {
                $http.post('/student/add-student', studentList).then(function(response) {
                    callback(response.data.data);
                }, function(a, b, c) {
                    throw Error("/student/add-student call failed");
                });
            },

            setNotification: function(status, message) {

                var notificationScope = scopesFactory.get('NotificationController');
                notificationScope.Model = notificationScope.Model || {};
                notificationScope.Model.Status = status;
                notificationScope.Model.Message = message;
            }
        };
    }]);
})(window.app = window.app || {});
