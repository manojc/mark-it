(function(window, $, undefined) {

    'use strict';

    var app = angular.module('mark-it', []);

    app.controller('UserProfileController', function() {

        var self = this;

        $.ajax({
            url: '/user?id=569fa8eb2329eace3f05e20a',
            success: function(response) {
                self.model = response.data.Strategy.Info;
            },
            async: false
        });
    });
})(window, jQuery);
