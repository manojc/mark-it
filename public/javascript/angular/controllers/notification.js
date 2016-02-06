(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.controller('NotificationController', ['AttendanceReportFactory', '$location', '$scope', function(AttendanceReportFactory, $location, $scope) {

        var self = this;

        $scope.Model = {};

        AttendanceReportFactory.store('NotificationController', $scope);

        self.getAlertType = function() {

            if (!$scope.Model || !$scope.Model.Status)
                return 'alert-info';

            switch ($scope.Model.Status) {

                case 'Success':
                    return 'alert-success';
                    break;

                case 'Info':
                    return 'alert-info';
                    break;

                case 'Warning':
                    return 'alert-warning';
                    break;

                case 'Failure':
                    return 'alert-danger';
                    break;

                default:
                    return 'alert-info';
                    break;
            }
        };

        self.resetMessage = function() {
            $scope.Message = '';
        };

    }]);

})(window.app = window.app || {});
