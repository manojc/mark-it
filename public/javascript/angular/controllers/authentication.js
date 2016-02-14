(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('AuthenticationController', ['AttendanceReportFactory', '$location', '$scope', function(AttendanceReportFactory, $location, $scope) {

        var self = this;
        self.IsLoading = true;
        self.IsUserLoggedIn = false;

        self.getLoggedInUser = function() {
            AttendanceReportFactory.getLoggedInUser(function(data) {
                if (data.Data)
                    self.IsUserLoggedIn = true;
                app.constant('User', data.Data);
                self.IsLoading = false;
            });
        };
    }]);

})(window.app = window.app || {});
