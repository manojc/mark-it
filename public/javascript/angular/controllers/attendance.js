(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('AttendanceController', ['AttendanceReportFactory', '$location', '$scope', function(AttendanceReportFactory, $location, $scope) {

        var self = this;
        self.AttendanceDate = new Date();

        //new attendance controller
        self.StudentCollection = [];
        self.NewAttendanceData = [];

        self.getStudentList = function() {
            AttendanceReportFactory.getAllStudents(function(data) {
                self.StudentCollection = data;
                if (self.StudentCollection && self.StudentCollection.length)
                    self.StudentCollection.forEach(function(item) {
                        item.IsPresent = true;
                    });
            });
        }

        self.getFullStudentName = function(model) {
            return model.FirstName + ' ' + model.LastName;
        };

        self.saveDetails = function() {
            if (!self.StudentCollection || !self.StudentCollection.length)
                return;

            self.StudentCollection.forEach(function(model, index, array) {
                self.NewAttendanceData.push({
                    StudentId: model._id,
                    Date: new Date(),
                    IsPresent: model.IsPresent || false,
                    Note: model.Note || ''
                });
            });

            AttendanceReportFactory.saveAttendance(self.NewAttendanceData, function(data) {
                $location.path('/attendance-report');
            });
        };
        //new attendance controller ends


        //attendance report controller
        self.AttendanceCollection = [];

        self.getAttendanceDetails = function() {
            AttendanceReportFactory.getAattendanceReport(function(data) {
                self.AttendanceCollection = data;
            });
        };

        self.getStatus = function(model) {
            return model.IsPresent ? 'Present' : 'Absent';
        };

        self.getStudentName = function(model) {
            if (!model || !model.StudentId)
                return '';
            return model.StudentId.FirstName + ' ' + model.StudentId.LastName;
        }

        self.removeSelectedRow = function(model) {
            var index = self.AttendanceCollection.indexOf(model);
            if (index > -1)
                self.AttendanceCollection.splice(index, 1);
        };
        //attendance report controller ends
    }]);

})(window.app = window.app || {});
