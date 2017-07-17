(function() {

    /* ---------------------------------------------
    Scripts initialization
    --------------------------------------------- */

    $(window).on('load', function() {

        $("body").imagesLoaded(function(){
            $(".page-loader div").fadeOut();
            $(".page-loader").delay(200).fadeOut("slow");
        });
        
        $(window).trigger("scroll");
        $(window).trigger("resize");
    });


    $(function() {
        $(window).trigger("resize");
        init_classic_menu();
        initPageSliders();
        init_wow();
    });


    $(window).on('resize', function() {
        init_classic_menu_resize();
        js_height_init();
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
    
    var pageSection = $(".home-section, .page-section, .small-section, .hero--section");
    pageSection.each(function(indx){
        
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    
    // Function for block height 100%
    function height_line(height_object, height_donor){
        height_object.height(height_donor.height());
        height_object.css({
            "line-height": height_donor.height() + "px"
        });
    }
    
    // Function equal height
    !function(a){
        a.fn.equalHeights = function(){
            var b = 0, c = a(this);
            return c.each(function(){
                var c = a(this).innerHeight();
                c > b && (b = c)
            }), c.css("height", b)
        }, a("[data-equal]").each(function(){
            var b = a(this), c = b.data("equal");
            b.find(c).equalHeights()
        })
    }(jQuery);


    var hamburger_menu = $("#js-mobile-menu");
    var desktop_nav = $(".inner-nav");

    function init_classic_menu_resize() {

        // Mobile menu max height
        $(".mobile-on .inner-nav > ul").css("max-height", $(window).height() - $(".main-nav").height() - 20 + "px");

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


        // height_line($(".inner-nav > ul > li"), $(".main-nav"));
        // height_line(mobile_nav, $(".main-nav"));


        // Transpaner menu
        if ($(".main-nav").hasClass("transparent")) {
            $(".main-nav").addClass("js-transparent");
        }

        $(window).scroll(function() {

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

        var menuToggle = hamburger_menu.off();
        desktop_nav.removeClass("js-opened");

        menuToggle.on('click', function(e) {
            e.preventDefault();
            $(this).toggleClass('active');
            $('.main-nav').toggleClass('transparent');
            desktop_nav.slideToggle(function() {
                if (desktop_nav.is(':hidden')) {
                    desktop_nav.removeAttr('style');
                }
            });
        });




    }



})(); // End of use strict

/* ---------------------------------------------
Sliders
--------------------------------------------- */


function initPageSliders() {

    var client__slider = new Swiper('.clients__swiper', {
        slidesPerView: 3,
        spaceBetween: 50,
        slideClass: 'clients__swiper--item',
        nextButton: '.swiper-next',
        prevButton: '.swiper-prev',
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 25
            },
            700: {
                slidesPerView: 2,
                spaceBetween: 25
            },
            600: {
                slidesPerView: 1,
                spaceBetween: 10
            }
        }
    });


    var swiper = new Swiper('.testimonial__swiper', {
        slideClass: 'testimonial__swiper--item',
        nextButton: '.swiper-next',
        prevButton: '.swiper-prev',
        pagination: '.swiper__pagination',
        autoHeight: true,
        paginationClickable: true,
        bulletClass: 'swiper__pagination--item',
        bulletActiveClass: 'active',
        paginationBulletRender: function(swiper, index, className) {
            return '<div class="' + className + '">' + '<span></span>' + '</div>';
        }

    });




};



/* ---------------------------------------------
 Height 100%
 --------------------------------------------- */
function js_height_init(){
    (function($){
        $(".js-height-full").height($(window).height());
        $(".js-height-parent").each(function(){
            $(this).height($(this).parent().first().height());
        });
    })(jQuery);
}

/* ---------------------------------------------
WOW animations
--------------------------------------------- */

function init_wow() {
    var wow = new WOW({
        boxClass: 'wow', // default
        animateClass: 'animated', // default
        offset: 90, // default
        mobile: false, // default
        live: true // default
    });
    wow.init();
};


/* ---------------------------------------------
Smooth Scroll
--------------------------------------------- */

// Select all links with hashes
$('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });