(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('AuthenticationController', ['AttendanceReportFactory', '$location', '$scope', function(AttendanceReportFactory, $location, $scope) {

        var self = this;
        self.Model = null;
        self.RoleCollection = [];
        self.SelectedRole = {};
        self.IsLoading = true;
        self.IsUserLoggedIn = false;
        self.isVerifiedUser = false;

        self.getLoggedInUser = function(callback) {
            AttendanceReportFactory.getLoggedInUser(function(data) {
                if (data.Data) {
                    self.Model = data.Data;
                    AttendanceReportFactory.store('User', data.Data);
                    self.IsUserLoggedIn = true;
                    if (self.Model.Roles && self.Model.Roles.length) {
                        self.isVerifiedUser = true;
                        $location.path('/')
                    };
                }
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

        self.updateUserDetails = function() {
            self.Model.Type = self.SelectedRole.Type;
            AttendanceReportFactory.updateUserDetails(self.Model, function() {
                $location.path('/');
            });
        };

        self.authenticate = function() {

            self.Model = AttendanceReportFactory.get('User');

            if (!self.Model || !self.Model.Roles || !self.Model.Roles.length) {
                $location.path('/register');
            }
        }
    }]);

})(window.app = window.app || {});
