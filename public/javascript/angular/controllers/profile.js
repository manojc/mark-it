(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('ProfileController', ['AttendanceReportFactory', '$location', function(AttendanceReportFactory, $location) {

        var self = this;
        self.IsLoading = true;
        self.IsUserLoggedIn = false;
        self.RoleCollection = [];
        self.SelectedRole = {};

        self.Model = {};

        self.getProfileDetails = function() {
            var user = AttendanceReportFactory.get('User');
            if (user) {
                self.Model = user;
                self.IsLoading = false;
                initializeModel();
            } else {
                $location.path('/register');
            }
        };

        self.updateUserDetails = function() {
            self.Model.Type = self.SelectedRole.Type;
            AttendanceReportFactory.updateUserDetails(self.Model, function() {
                $location.path('/');
            });
        };

        self.getUserRoles = function(callback) {
            if (self.Model.IsNew)
                AttendanceReportFactory.getUserRoles(function(response) {
                    self.RoleCollection = response.Data;
                    self.RoleCollection.sortBy('Type', true);
                    // self.SelectedRole = response.Data[0];
                    callback();
                });
            else
                callback();
        };

        function initializeModel() {
            if (!self.Model || !self.Model.Roles || !self.Model.Roles.length) {
                $location.path('/register');
            }

            var selfRole = self.Model.Roles.find(function(item, index) {
                return item.IsMyRole;
            });

            self.SelectedRole = selfRole;
        }
    }]);

})(window.app = window.app || {});
