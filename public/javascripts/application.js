(function(window, $, undefined) {

    'use strict';

    var app = angular.module('mark-it', []);

    app.controller('UserProfileController', function() {

        var self = this;

        $.ajax({
            url: '/get-logged-in-user',
            success: function(response) {
                self.model = response;
            },
            async: false
        });
    });
})(window, jQuery);
