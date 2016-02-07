(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");


    app.controller('ClassRoomController', ['AttendanceReportFactory', '$location', '$routeParams', function(AttendanceReportFactory, $location, $routeParams) {

        var self = this;
        self.IsLoading = true;

        self.Model = {};
        self.Collection = {};

        self.saveClassRoom = function() {
            AttendanceReportFactory.saveClassRooms([self.Model], function(data) {
                $location.path('/class-room/all');
            });
        };

        self.getClassRooms = function() {
            AttendanceReportFactory.getAllClassRooms(function(data) {
                self.Collection = data;
                self.IsLoading = false;
            });
        };

        self.getClassRoom = function() {
            AttendanceReportFactory.getClassRoom($routeParams.id, function(data) {
                self.Model = data;
                self.IsLoading = false;
            });
        };

        self.removeSelectedRow = function(model) {
            var index = self.Collection.indexOf(model);
            if (index >= 0)
                self.Collection.splice(index, 1);
        };
    }]);

})(window.app = window.app || {});
