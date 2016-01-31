(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('StudentListController', ['AttendanceReportFactory', '$location', function(AttendanceReportFactory, $location) {

        var self = this;

        self.Collection = [];

        AttendanceReportFactory.getAllStudents(function(data) {
            self.Collection = data;
            AttendanceReportFactory.setNotification('Success', 'Student list fecthed successfully!');
        });

        self.getFullName = function(model) {
            return model.FirstName + ' ' + model.LastName;
        };

        self.removeSelectedRow = function(model) {
            var index = self.Collection.indexOf(model);
            if (index >= 0)
                self.Collection.splice(model);
        };

    }]);

})(window.app = window.app || {});
