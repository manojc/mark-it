(function(app, $, undefined) {

    app.controller('NotificationController', function($scope, ProfileData) {
        $scope.currentUser = ProfileData.getProfileData();
    });

})(window.markIt = window.markIt || {}, jQuery);
