(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");


    app.controller('AttendanceReportController', ['AttendanceReportFactory', function(AttendanceReportFactory) {

        var self = this;

        self.Collection = [];

        AttendanceReportFactory.getAattendanceReport(function(collection) {
            self.Collection = collection;
        });

        self.removeFirstRow = function() {
            self.Collection.shift();
        };

        self.getStatus = function(model) {
            return model.IsPresent ? 'Present' : 'Absent';
        };
        self.removeSelectedRow = function(model) {
            var index = self.Collection.indexOf(model);
            if (index > -1)
                self.Collection.splice(index, 1);
        };
    }]);

})(window.app = window.app || {});
