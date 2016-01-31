(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('NewStudentController', ['AttendanceReportFactory', '$location', function(AttendanceReportFactory, $location) {

        var self = this;

        self.Student = {};
        self.StudentList = [];

        self.addStudent = function() {
            self.StudentList.push(self.Student);
            self.saveStudents();
        };

        self.saveStudents = function() {
            AttendanceReportFactory.saveStudents(self.StudentList, function(data) {
                if (data)
                    $location.path('/students/all');
            })
        };
    }]);

})(window.app = window.app || {});
