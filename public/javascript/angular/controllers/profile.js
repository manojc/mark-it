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
            AttendanceReportFactory.getProfileDetails(function(profileResponse) {

                self.Model = profileResponse.Data;
                self.getUserRoles(function() {
                    self.IsLoading = false;
                });
            });
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
        }
    }]);

})(window.app = window.app || {});
