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
            }
        };
    }]);

})(window.app = window.app || {});
