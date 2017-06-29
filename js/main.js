/* ---------------------------------------------
Scripts initialization
--------------------------------------------- */

window.addEventListener('DOMContentLoaded', () => {
    fadeOut(document.querySelector('.se-pre-con'));
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('resize'));
});


document.addEventListener('DOMContentLoaded', () => {
    init_classic_menu();
    initPageSliders();
});


window.onresize = () => {
    init_classic_menu_resize();
}




/* --------------------------------------------
Platform detect
--------------------------------------------- */
let mobileTest;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    mobileTest = true;
    document.documentElement.classList.add("mobile");
} else {
    mobileTest = false;
    document.documentElement.classList.add("no-mobile");
}

let mozillaTest;
if (/mozilla/.test(navigator.userAgent)) {
    mozillaTest = true;
} else {
    mozillaTest = false;
}
let safariTest;
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
    var page_section = document.querySelectorAll(".home-section, .page-section, .small-section");

    page_section.forEach(function(indx) {
        if (indx.hasAttribute("data-background")) {
            indx.style.backgroundImage = "url(" + indx.dataset.background + ")";
        }
    });



    // Function for block height 100%
    function height_line(height_object, height_donor) {
        height_object.style.height = height_donor.offsetHeight + "px";
        height_object.style.lineHeight = height_donor.offsetHeight + "px";
    }





// Fade Out

function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

// Fade In
function fadeIn(el, display){
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}





const main_nav = document.querySelector('.main-nav');
const desktop_nav = document.querySelector(".inner-nav");
const hamburger_menu = document.querySelector("#js-mobile-menu");



function init_classic_menu_resize() {

    let window_width = window.innerWidth;
    let window_height = window.innerHeight;
    let desktop_nav_ul = document.querySelector(".inner-nav").children;


    desktop_nav.style.maxHeight =  window_height - desktop_nav.offsetHeight - 20 + "px";

    if (window_width <= 1000) {
        main_nav.classList.add("mobile-on");
        desktop_nav.classList.add("closed");
    } else if (window_width > 1000) {
        main_nav.classList.remove("mobile-on");
    }

}



function init_classic_menu() {

    if (main_nav.classList.contains("transparent")) {
        main_nav.classList.add("js-transparent");
    }

    window.onscroll = function() {
        if (window.scrollY > 10) {
            document.querySelector(".js-transparent").classList.remove("transparent");
            document.querySelector(".nav-download_btn").classList.remove("btn-border-w");
        } else {
            document.querySelector(".js-transparent").classList.add("transparent");
            document.querySelector(".nav-download_btn").classList.add("btn-border-w");
        }
    }




//   var menuToggle = $('#js-mobile-menu').unbind();
//   $('#js-navigation-menu').removeClass("show");

//   menuToggle.on('click', function(e) {
//     e.preventDefault();
//     $('#js-navigation-menu').slideToggle(function(){
//       if($('#js-navigation-menu').is(':hidden')) {
//         $('#js-navigation-menu').removeAttr('style');
//       }
//     });
//   });


hamburger_menu.addEventListener("click", function(evnt){
    evnt.preventDefault();
    // desktop_nav.classList.toggle("closed");
    // if (desktop_nav.style.display === 'none') {
    //     desktop_nav.style.display = 'block';
    // } else {
    //     desktop_nav.style.display = 'none';
    // }


if (desktop_nav.classList.contains('closed')) {
    desktop_nav.classList.remove('closed');
} else {
    desktop_nav.classList.add('closed')
}

});




}




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