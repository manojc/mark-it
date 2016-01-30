(function(app, $, undefined) {

    app.controller('NotificationController', function($scope, ProfileData) {
        ProfileData.getProfileData(function(currentUser) {
            $scope.currentUser = currentUser;
            // $scope.$apply();
        });
    });

})(window.markIt = window.markIt || {}, jQuery);
