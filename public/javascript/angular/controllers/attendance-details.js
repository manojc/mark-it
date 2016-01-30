(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('AttendanceDetailsController', ['AttendanceReportFactory', '$routeParams', function(AttendanceReportFactory, $routeParams) {

        var self = this;

        self.model = {};

        AttendanceReportFactory.getStudentDetails($routeParams.id, function(response) {
            self.model = response;
        });

        self.getClassName = function() {
            return self.model.Class + ' (' + self.model.Division + ')';
        };
    }]);

})(window.app = window.app || {});
