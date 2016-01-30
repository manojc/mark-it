(function(app, $, undefined) {

    //gets the current user information from session.
    app.factory('ProfileData', ['$http', function($http) {

        return {

            _profileData: null,

            getProfileData: function(callback) {

                var self = this;

                if (!self._profileData)
                    $http.get('/user?id=569fa8eb2329eace3f05e20a').success(function(response) {
                        self._profileData = response.data.Strategy.Info;
                        callback(self._profileData);
                    });
                else
                    callback(self._profileData);
            },

            resetProfileData: function() {

                var self = this;

                $http.get('/user?id=569fa8eb2329eace3f05e20a').success(function(response) {
                    self._profileData = response.data.Strategy.Info;
                });
            }
        };
    }]);

})(window.markIt = window.markIt || {}, jQuery);
