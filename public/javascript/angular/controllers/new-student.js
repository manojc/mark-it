(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('NewStudentController', ['AttendanceReportFactory', '$location', function(AttendanceReportFactory, $location) {

        var self = this;

        self.Student = {};
        self.StudentList = [];

        self.addStudent = function() {
            self.StudentList.push(self.Student);
            self.Student = {};
        };

        self.getFullName = function(model) {
            return model.FirstName + ' ' + model.LastName;
        };

        self.saveStudents = function() {
            AttendanceReportFactory.saveStudents(self.StudentList, function(data) {
                if (data)
                    $location.path('/students/all');
            })
        };

        self.removeSelectedRow = function(model) {
            var index = self.StudentList.indexOf(model);
            if (index >= 0) self.StudentList.splice(model, 1);
        }
    }]);

})(window.app = window.app || {});
