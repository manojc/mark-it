(function($, window, undefined) {

    $('#sidebar-wrapper').slimScroll({
        width: '250px',
        height: '100%',
        color: 'white',
        wheelStep: 1,
        allowPageScroll: true
    });

    $('#profile').addClass('hidden');

    $.get(
        '/get-logged-in-user',
        function(data) {
            appendUserDetails(data);
        });

    function appendUserDetails(data) {

        $('#user-name').attr('title', capitalizInitialLetter(data.displayName));
        $('#user-email').attr('title', data.email);

        truncateUserInfo(data);

        $('#profile-pic').attr({
            src: data.profilePicUrl
        });
        $('#user-name').text(capitalizInitialLetter(data.displayName));
        $('#user-email').text(data.email);
        $('#profile').removeClass('hidden');
    }

    function capitalizInitialLetter(string) {
        if (!string)
            return string;

        var stringWords = string.trim().split(' ');

        if (!stringWords)
            return;

        var capitalizedInitialLetter = '';
        for (var i = 0; i < stringWords.length; i++) {
            if (!stringWords[i].length)
                continue;
            stringWords[i] = stringWords[i].charAt(0).toUpperCase() + stringWords[i].slice(1).toLowerCase();
        };
        return stringWords.join(' ');
    }

    function truncateUserInfo(userInfo) {
        if (userInfo.displayName.length > 13) {
            var sliceNumber = 11 - userInfo.displayName.length;
            userInfo.displayName = userInfo.displayName.slice(0, sliceNumber) + '..'
        }

        if (userInfo.email && userInfo.email.length > 19) {
            var sliceNumber = 11 - userInfo.email.length;
            userInfo.email = userInfo.email.slice(0, sliceNumber) + '..'
        }
    }
})(jQuery, window);
