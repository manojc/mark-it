(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('NewAttendanceController', ['AttendanceReportFactory', '$location', function(AttendanceReportFactory, $location) {

        var self = this;

        self.AttendanceDate = new Date();

        self.Collection = {};

        self.AttendanceData = [];

        AttendanceReportFactory.getAllStudents(function(response) {
            self.Collection = response;
        });

        self.getFullName = function(model) {
            return model.FirstName + ' ' + model.LastName;
        };

        self.saveDetails = function() {
            if (!self.Collection)
                return;

            self.Collection.forEach(function(model, indes, array) {
                self.AttendanceData.push({
                    StudentId: model._id,
                    Date: self.AttendanceDate,
                    IsPresent: model.IsPresent || false,
                    Note: model.Note || ''
                });
            });

            AttendanceReportFactory.saveAttendance(self.AttendanceData, function(response) {
                $location.path('/');
            });
        };
    }]);

})(window.app = window.app || {});
