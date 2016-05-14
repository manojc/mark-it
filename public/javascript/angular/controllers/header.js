(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('HeaderController', ['AttendanceReportFactory', '$window', '$scope', function(AttendanceReportFactory, $window, $scope) {

        var self = this;

        $scope.Model = {};

        self.logout = function() {
            AttendanceReportFactory.clear();
            $window.location.href = '/auth/logout';
        };

    }]);

})(window.app = window.app || {});
