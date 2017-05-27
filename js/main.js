(function($) {
    "use strict"; // Start of use strict


    /* ---------------------------------------------
    Scripts initialization
    --------------------------------------------- */

    $(window).on('load', function() {
        $(window).trigger("scroll");
        $(window).trigger("resize");
    });


    $(function() {
        $(window).trigger("resize");
        init_classic_menu();
        initPageSliders();
    });


    $(window).on('resize', function() {
        init_classic_menu_resize();
    });




    /* --------------------------------------------
     Platform detect
     --------------------------------------------- */
    var mobileTest;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTest = true;
        $("html").addClass("mobile");
    } else {
        mobileTest = false;
        $("html").addClass("no-mobile");
    }

    var mozillaTest;
    if (/mozilla/.test(navigator.userAgent)) {
        mozillaTest = true;
    } else {
        mozillaTest = false;
    }
    var safariTest;
    if (/safari/.test(navigator.userAgent)) {
        safariTest = true;
    } else {
        safariTest = false;
    }

    // Detect touch devices    
    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    }




    /* ---------------------------------------------
     Sections helpers
     --------------------------------------------- */

    // Sections backgrounds

    var pageSection = $(".home-section, .page-section, .small-section, .split-section");
    pageSection.each(function(indx) {

        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    // Function for block height 100%
    function height_line(height_object, height_donor) {
        height_object.height(height_donor.height());
        height_object.css({
            "line-height": height_donor.height() + "px"
        });
    }




    var mobile_nav = $(".mobile-nav");
    var desktop_nav = $(".desktop-nav");

    function init_classic_menu_resize() {

        // Mobile menu max height
        $(".mobile-on .desktop-nav > ul").css("max-height", $(window).height() - $(".main-nav").height() - 20 + "px");

        // Mobile menu style toggle
        if ($(window).width() <= 1000) {
            $(".main-nav").addClass("mobile-on");
        } else
        if ($(window).width() > 1000) {
            $(".main-nav").removeClass("mobile-on");
            desktop_nav.show();
        }
    }



    function init_classic_menu() {


        height_line($(".inner-nav > ul > li"), $(".main-nav"));
        height_line(mobile_nav, $(".main-nav"));


        // Transpaner menu

        if ($(".main-nav").hasClass("transparent")) {
            $(".main-nav").addClass("js-transparent");
        }

        $(window).scroll(function() {

            if ($(window).scrollTop() > 10) {
                $(".js-transparent").removeClass("transparent");
                $(".main-nav, .nav-logo, .mobile-nav, .nav_download").addClass("small-height");
            } else {
                $(".js-transparent").addClass("transparent");
                $(".main-nav, .nav-logo, .mobile-nav, .nav_download").removeClass("small-height");

            }
        });

    }



})(jQuery); // End of use strict


/* ---------------------------------------------
 Sliders
 --------------------------------------------- */
function initPageSliders() {
    (function($) {
        "use strict";

        // Testimonial Slider
        $('#owlz').owlCarousel({
            items: 1,
            autoPlay: 2000,
            loop: true,
            nav: false,
            pagination: false
        })

        // Client Logo slider
        $('#clients-section').owlCarousel({
            items: 3,
            autoPlay: 2000,
            loop: true,
            nav: false,
            pagination: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 2,
                    nav: true
                },
                600: {
                    items: 3,
                    nav: false
                }
            }
        });

    })(jQuery);
};