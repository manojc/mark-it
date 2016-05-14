(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('AuthenticationController', ['AttendanceReportFactory', '$location', '$scope', function(AttendanceReportFactory, $location, $scope) {

        var self = this;
        self.Model = null;
        self.RoleCollection = [];
        self.IsLoading = true;
        self.IsUserLoggedIn = false;
        self.isVerifiedUser = false;

        self.getLoggedInUser = function(callback) {
            AttendanceReportFactory.getLoggedInUser(function(data) {
                if (data.Data) {
                    self.Model = data.Data;
                    self.IsUserLoggedIn = true;
                    if (self.Model.roles && self.Model.roles.length) {
                        self.isVerifiedUser = true;
                    };
                }
                app.constant('User', data.Data);
                self.IsLoading = false;

                if (callback && typeof callback === 'function') {
                    callback(data);
                };
            });
        };

        self.getRoles = function() {
            AttendanceReportFactory.getUserRoles(function(data) {
                self.RoleCollection = data.Data;
            });
        };

        self.authenticate = function() {

            if (!self.user || (self.user && !self.IsUserLoggedIn) || (self.user && !self.isVerifiedUser)) {
                $location.path('/register');
            }
        }
    }]);

})(window.app = window.app || {});
