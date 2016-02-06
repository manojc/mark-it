(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('AttendanceController', ['AttendanceReportFactory', '$location', '$scope', function(AttendanceReportFactory, $location, $scope) {

        var self = this;
        self.AttendanceDate = new Date();

        //new attendance controller
        self.StudentCollection = [];
        self.ClassRoomCollection = [];
        self.AttendanceCollection = [];

        self.AttendanceCollectionPerClass = [];
        self.StudentCollectionPerClass = [];

        self.SelectedClass = {};

        self.getStudentList = function() {
            AttendanceReportFactory.getAllStudents(function(data) {
                self.StudentCollection = data;
                self.StudentCollection.forEach(function(model, index, array) {
                    if (!self.ClassRoomCollection.containsObject(model.ClassRoomId, '_id'))
                        self.ClassRoomCollection.push(model.ClassRoomId);
                });

                self.SelectedClass = self.ClassRoomCollection[0] || {};
                self.updateStudentListPerClass();

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
                self.AttendanceCollection.push({
                    StudentId: model._id,
                    ClassRoomId: model.ClassRoomId,
                    Date: new Date(),
                    IsPresent: model.IsPresent || false,
                    Note: model.Note || ''
                });
            });

            AttendanceReportFactory.saveAttendance(self.AttendanceCollection, function(data) {
                $location.path('/attendance-report');
            });
        };

        self.updateStudentListPerClass = function() {
            if (!self.SelectedClass || !self.SelectedClass._id)
                return;
            self.StudentCollectionPerClass = self.StudentCollection.filter(function(model) {
                return model.ClassRoomId._id === self.SelectedClass._id;
            });
        };

        self.updateAttendenceListPerClass = function() {
            if (!self.SelectedClass || !self.SelectedClass._id)
                return;
            self.AttendanceCollectionPerClass = self.AttendanceCollection.filter(function(model) {
                return model.ClassRoomId._id === self.SelectedClass._id;
            });
        };
        //new attendance controller ends


        //attendance report controller
        self.AttendanceCollection = [];

        self.getAttendanceDetails = function() {
            AttendanceReportFactory.getAattendanceReport(function(data) {
                self.AttendanceCollection = data;

                self.AttendanceCollection.forEach(function(model, index, array) {
                    if (!self.StudentCollection.containsObject(model.StudentId, '_id'))
                        self.StudentCollection.push(model.StudentId);

                    if (!self.ClassRoomCollection.containsObject(model.ClassRoomId, '_id'))
                        self.ClassRoomCollection.push(model.ClassRoomId);
                });

                self.SelectedClass = self.ClassRoomCollection[0] || {};
                self.updateAttendenceListPerClass();
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
