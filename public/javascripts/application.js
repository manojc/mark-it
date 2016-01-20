(function($, window, undefined) {
    $('#log-in-link').off('click').click(function() {
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active')
        $('#app-container').html($('#login-strategy-template').html());
    });
    $('#home-link').off('click').click(function() {
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active')
        $('#app-container').html($('#home-template').html());
    });
})(jQuery, window);
