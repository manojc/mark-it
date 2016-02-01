(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('StudentController', ['AttendanceReportFactory', '$location', '$routeParams', function(AttendanceReportFactory, $location, $routeParams) {

        var self = this;

        self.Model = {};
        self.Collection = [];
        self.ClassRooms = [];
        self.SelectedClass = {};

        //new student controller
        self.addStudent = function() {
            self.Model.ClassRoomId = self.SelectedClass._id;
            self.Model.Class = self.SelectedClass.Name;
            self.Collection.push(self.Model);
            self.Model = {};
        };
        self.saveStudentList = function() {
            AttendanceReportFactory.saveStudents(self.Collection, function(data) {
                if (data)
                    $location.path('/students/all');
            })
        };
        self.getClassRooms = function() {
            AttendanceReportFactory.getAllClassRooms(function(data) {
                self.ClassRooms = data;
            });
        };
        //new student controller ends


        //student details controller
        self.getStudentDetails = function() {
            AttendanceReportFactory.getStudentDetails($routeParams.id, function(response) {
                self.Model = response;
            });
        };
        //student details controller ends


        //student list controller
        self.getAllStudents = function() {
            AttendanceReportFactory.getAllStudents(function(data) {
                self.Collection = data;
                // AttendanceReportFactory.setNotification('Success', 'Student list fecthed successfully!');
            });
        };
        //student list controller ends


        //common methods        
        self.removeSelectedRow = function(model) {
            var index = self.Collection.indexOf(model);
            if (index >= 0) self.Collection.splice(model, 1);
        };
        self.getFullName = function(model) {
            return model.FirstName + ' ' + model.LastName;
        };
        //common methods end
    }]);

})(window.app = window.app || {});
