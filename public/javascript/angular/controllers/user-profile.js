(function(app, $, undefined) {

    app.controller('UserProfileController', function($scope, ProfileData) {
        $scope.currentUser = ProfileData.getProfileData();
    });

})(window.markIt = window.markIt || {}, jQuery);
