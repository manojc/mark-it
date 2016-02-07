(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('StudentController', ['AttendanceReportFactory', '$location', '$routeParams', function(AttendanceReportFactory, $location, $routeParams) {

        var self = this;

        self.Model = {};
        self.StudentCollection = [];
        self.StudentCollectionPerClass = [];

        self.ClassRoomCollection = [];
        self.SelectedClass = {};

        //new student controller
        self.addStudent = function() {
            self.Model.ClassRoomId = self.SelectedClass._id;
            self.Model.Class = self.SelectedClass.Name;
            self.StudentCollection.push(self.Model);
            self.Model = {};
        };
        self.saveStudentList = function() {
            AttendanceReportFactory.saveStudents(self.StudentCollection, function(data) {
                if (data)
                    $location.path('/students/all');
            })
        };
        self.getClassRooms = function() {
            AttendanceReportFactory.getAllClassRooms(function(data) {
                self.ClassRoomCollection = data;
                self.ClassRoomCollection.sortBy('Name', true);
                self.SelectedClass = data[0];
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
                self.StudentCollection = data;
                self.StudentCollection.forEach(function(model, index, array) {
                    if (!self.ClassRoomCollection.containsObject(model.ClassRoomId, '_id'))
                        self.ClassRoomCollection.push(model.ClassRoomId);
                });

                self.ClassRoomCollection.sortBy('Name', true);
                self.SelectedClass = self.ClassRoomCollection[0] || {};
                self.updateStudentListPerClass();
            });
        };
        //student list controller ends

        //common methods        
        self.removeSelectedRow = function(model) {
            var index = self.StudentCollection.indexOf(model);
            if (index >= 0) self.StudentCollection.splice(model, 1);
        };
        self.getFullName = function(model) {
            return model.FirstName + ' ' + model.LastName;
        };
        self.updateStudentListPerClass = function() {
            if (!self.SelectedClass || !self.SelectedClass._id)
                return;
            self.StudentCollectionPerClass = self.StudentCollection.filter(function(model) {
                return model.ClassRoomId._id === self.SelectedClass._id;
            });
        };
        //common methods end
    }]);

})(window.app = window.app || {});
