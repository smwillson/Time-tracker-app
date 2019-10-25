var $ = require("jquery");

/*=====================================================
                Preloader
======================================================*/

$(window).on('load', function () {
    
    $('#preloader').delay(600).fadeOut('slow');
});
