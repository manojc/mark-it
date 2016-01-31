(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('AttendanceDetailsController', ['AttendanceReportFactory', '$routeParams', function(AttendanceReportFactory, $routeParams) {

        var self = this;

        self.Model = {};

        AttendanceReportFactory.getStudentDetails($routeParams.id, function(response) {
            self.Model = response;
            self.Model.DivisionDetails = self.Model.Class + ' (' + self.Model.Division + ')';
        });
    }]);

})(window.app = window.app || {});
