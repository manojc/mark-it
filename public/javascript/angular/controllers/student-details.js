(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('StudentDetailsController', ['AttendanceReportFactory', '$routeParams', function(AttendanceReportFactory, $routeParams) {

        var self = this;

        self.Model = null;

        AttendanceReportFactory.getStudentDetails($routeParams.id, function(response) {
            self.Model = response;
            if (self.Model)
                createComputedProperties();
        });

        function createComputedProperties() {
            self.Model.DivisionDetails = self.Model.Class + ' (' + self.Model.Division + ')';
        }
    }]);

})(window.app = window.app || {});
