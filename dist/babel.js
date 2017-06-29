"use strict";

(function ($) {
    "use strict"; // Start of use strict


    /* ---------------------------------------------
    Scripts initialization
    --------------------------------------------- */

    $(window).on('load', function () {
        $(".se-pre-con").fadeOut("slow");;
        $(window).trigger("scroll");
        $(window).trigger("resize");
    });

    $(function () {
        $(window).trigger("resize");
        init_classic_menu();
        initPageSliders();
    });

    $(window).on('resize', function () {
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

    var pageSection = $(".home-section, .page-section, .small-section");
    pageSection.each(function (indx) {

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

    var hamburger_menu = $("#js-mobile-menu");
    var desktop_nav = $(".inner-nav");

    function init_classic_menu_resize() {

        // Mobile menu max height
        $(".mobile-on .inner-nav > ul").css("max-height", $(window).height() - $(".main-nav").height() - 20 + "px");

        // Mobile menu style toggle
        if ($(window).width() <= 1000) {
            $(".main-nav").addClass("mobile-on");
        } else if ($(window).width() > 1000) {
            $(".main-nav").removeClass("mobile-on");
            desktop_nav.show();
        }
    }

    function init_classic_menu() {

        // height_line($(".inner-nav > ul > li"), $(".main-nav"));
        // height_line(mobile_nav, $(".main-nav"));


        // Transpaner menu
        if ($(".main-nav").hasClass("transparent")) {
            $(".main-nav").addClass("js-transparent");
        }

        $(window).scroll(function () {

            if ($(window).scrollTop() > 10) {
                $(".js-transparent").removeClass("transparent");
                // $(".main-nav, .nav-logo, .nav_download").addClass("small-height");
                $(".nav-download_btn").removeClass("btn-border-w");
            } else {
                $(".js-transparent").addClass("transparent");
                // $(".main-nav, .nav-logo, .nav_download").removeClass("small-height");
                $(".nav-download_btn").addClass("btn-border-w");
            }
        });

        // Hamburger Menu

        var menuToggle = hamburger_menu.unbind();
        desktop_nav.removeClass("show");

        menuToggle.on('click', function (e) {
            e.preventDefault();
            desktop_nav.slideToggle(function () {
                if (desktop_nav.is(':hidden')) {
                    desktop_nav.removeAttr('style');
                }
            });
        });
    }
})(jQuery); // End of use strict


/* ---------------------------------------------
 Sliders
 --------------------------------------------- */
function initPageSliders() {
    (function ($) {
        "use strict";

        // Testimonial Slider

        $('#testimonial__slider').owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            center: true,
            autoHeight: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // Client Logo slider
        $('#clients__slider').owlCarousel({
            items: 3,
            loop: true,
            pagination: false,
            nav: true,
            responsiveClass: true,
            dots: false,
            autoplay: false,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3,
                    slideBy: 3,
                    autoplayHoverPause: true
                }
            }
        });
    })(jQuery);
};

/* ---------------------------------------------
 Smooth Scroll
 --------------------------------------------- */

// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]').not('[href="#0"]').click(function (event) {
    // On-page links
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000, function () {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                    // Checking if the target was focused
                    return false;
                } else {
                    $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                };
            });
        }
    }
});

function Person() {
    var _this = this;

    this.age = 0;

    setInterval(function () {
        _this.age++; // |this| properly refers to the person object
    }, 1000);
}

var p = new Person();
//# sourceMappingURL=babel.js.map
