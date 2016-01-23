(function(window, $, undefined) {

    'use strict';

    window.app = angular.module('mark-it', []);

    app.controller('NotificationController', function() {

    });

    app.controller('UserProfileController', function($scope) {

        var self = this;

        $.ajax({
            url: '/user?id=569fa8eb2329eace3f05e20a',
            success: function(response) {
                $scope.user = response.data.Strategy.Info;
            },
            async: false
        });
    });
})(window, jQuery);
