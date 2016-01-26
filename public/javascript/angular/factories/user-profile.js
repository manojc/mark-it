(function(app, $, undefined) {

    //gets the current user information from session.
    app.factory('ProfileData', function() {

        return {

            _profileData: null,

            getProfileData: function() {

                var self = this;

                if (!self._profileData)
                    $.ajax({
                        url: '/user?id=569fa8eb2329eace3f05e20a',
                        success: function(response) {
                            self._profileData = response.data.Strategy.Info;
                        },
                        async: false
                    });
                return self._profileData;
            },

            resetProfileData: function() {

                var self = this;

                $.ajax({
                    url: '/user?id=569fa8eb2329eace3f05e20a',
                    success: function(response) {
                        self._profileData = response.data.Strategy.Info;
                    },
                    async: false
                });
            }
        };
    });

})(window.markIt = window.markIt || {}, jQuery);
