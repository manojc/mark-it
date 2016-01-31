(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('NewAttendanceController', ['AttendanceReportFactory', '$location', '$scope', function(AttendanceReportFactory, $location, $scope) {

        var self = this;

        self.AttendanceDate = new Date();

        self.Collection = {};

        // $scope.AttendanceDate = new Date();

        self.AttendanceData = [];

        AttendanceReportFactory.getAllStudents(function(data) {
            self.Collection = data;
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

            AttendanceReportFactory.saveAttendance(self.AttendanceData, function(data) {
                $location.path('/attendance-report');
            });
        };
    }]);

})(window.app = window.app || {});
