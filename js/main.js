import jQuery from 'jquery';
import gsap from "gsap";
import SmoothScrollbar from 'smooth-scrollbar';
import ScrollTrigger from "gsap/ScrollTrigger";
import Magnetic from "../js/vendor/magnetic";
import ScrollTriggerPlugin from '../js/vendor/ScrollTriggerPlugin';
import SoftScrollPlugin from '../js/vendor/SoftScrollPlugin';

window.$ = window.jQuery = jQuery;

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';


// GSAP ScrollTrigger & Soft Edges plugin for SmoothScroll
SmoothScrollbar.use(ScrollTriggerPlugin, SoftScrollPlugin);


// Loader
$(window).on('load', function() {
    $(".my-loader").removeClass("-visible");
});

// Init magnetic
$('[data-magnetic]').each(function() {
    new Magnetic(this);
})


// // Drawer
// $('.my-drawer-toggle').click( function(){
// 	$('.my-drawer').toggleClass('my-drawer--open');
// 	$('.my-btn_menu').toggleClass('-active');
// }); 

// $('.my-drawer-close').click(function() {
// 	$('.my-drawer').removeClass('my-drawer--open');
// 	$('.my-btn_menu').removeClass('-active');
// });

// $('.my-drawer-overlay').click(function() {
// 	$('.my-drawer').removeClass('my-drawer--open');
// 	$('.my-btn_menu').removeClass('-active');
// });

// DRAWER 100VH INCLUDING URL BAR
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});





// ============================================= SMOOTH SCROLL & GSAP ====================================================

ScrollTrigger.saveStyles(".my-hero, .my-main, .my-logo svg");

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};


if (isMobileDevice()) {
    $(document).ready(function() {

        $(".my-who").addClass("mobile-slider");

        // Blue container
        (function() {
            // let scrolled = 1;
            let marqueeBlue = gsap.utils.toArray('.-blue .my-scroll-text');

            marqueeBlue.forEach((item, index) => {
                let distance = item.clientWidth;

                const tl = new gsap.timeline({});
                const tl2 = new gsap.timeline({});

                tl.to(item, 10, {
                    ease: "none",
                    xPercent: -100, //move each box 100% to left
                    modifiers: {
                        x: gsap.utils.unitize(x => parseFloat(x) % distance) //force x value to be between 0 and 500 using modulus
                    },
                    repeat: -1
                });

                tl2.fromTo(item, {
                    scale: 0.8,
                    duration: 0.65,
                    ease: "Power2.easeOut",
                }, {
                    scale: 1,
                    duration: 0.65,
                    ease: "Power2.easeOut",
                }, 0);
            });
        })();

        (function() {
            const marquee = document.querySelectorAll('.my-marquee');

            marquee.forEach((e) => {

                // Create swiper carousel
                const carousel = e.querySelectorAll('.my-marquee-carousel');

                carousel.forEach((e) => {
                    const items = e.querySelector('.my-marquee-items');
                    const item = e.querySelectorAll('.my-marquee-item');

                    e.classList.add('swiper-container');
                    items.classList.add('swiper-wrapper');
                    item.forEach(e => e.classList.add('swiper-slide'));

                    const slider = new Swiper(e, {
                        slidesPerView: 'auto',
                        loop: true,
                        speed: 3000,
                        autoplay: {
                            delay: 1,
                            disableOnInteraction: false,
                        },
                        loopedSlides: 10,
                        freeMode: {
                            enabled: true,
                            // momentumBounce: false,
                            momentumVelocityRatio: 0.3,
                            freeModeMomentum: false,
                            minimumVelocity: 0,
                            sticky: false,
                        },
                    });
                });
            });
        })();

        if (document.querySelector(".reveal-card-mobile")) {
            (function() {
                let revealCard = document.querySelectorAll(".reveal-card-mobile");

                let revealCardBlock = revealCard.forEach((element) => {

                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: element,
                            start: "top bottom",
                            scrub: false,
                        }
                    });

                    tl.fromTo(element, {
                        scale: 0.9,
                    }, {
                        scale: 1,
                        duration: 1.5,
                        ease: "expo.out",
                    }, 0);
                });
            })();
        }


        // Home - page reveal logo
        $(document).ready(function() {
            (function() {
                let container = document.querySelectorAll(".my-hero");
                let logo = document.querySelectorAll(".my-logo svg");
                // let main = document.querySelectorAll(".my-main");

                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: "top bottom",
                        scrub: false,
                    }
                });

                tl.fromTo(logo, {
                    scale: 0.9,
                    opacity: 0,
                }, {
                    scale: 1,
                    opacity: 1,
                    duration: 1.5,
                    delay: 0,
                    ease: "expo.out",
                }, 0);
            })();
        });

        //Shape color animation
        (function() {
            let triangle = document.querySelector('.canvas .triangle');
            let circle = document.querySelector('.canvas .circle');
            let square = document.querySelector('.canvas .square');
            // var trigger = document.querySelector('.-blue');

            const tl = new gsap.timeline({});

            tl.fromTo(triangle, {
                borderBottomColor: "#7E8EF7",
                ease: "none",
                repeatDelay: 4,
                duration: 1,
            }, {
                borderBottomColor: "#F8FA7F",
                ease: "none",
                repeat: -1,
                yoyo: true,
                repeatDelay: 4,
                duration: 1,
            }, 0);

            tl.fromTo(circle, {
                background: "#7E8EF7",
                ease: "none",
                repeatDelay: 4,
                duration: 1,
            }, {
                background: "#FF9FC2",
                ease: "none",
                repeat: -1,
                yoyo: true,
                delay: 1,
                duration: 1,
                repeatDelay: 4,
            }, 0);

            tl.fromTo(square, {
                background: "#7E8EF7",
                ease: "none",
                repeatDelay: 4,
                duration: 1,
            }, {
                background: "#FFFFFF",
                ease: "none",
                repeat: -1,
                yoyo: true,
                delay: 2,
                duration: 1,
                repeatDelay: 4,
            }, 0);
        })();

    });
};





if (!isMobileDevice()) {
    // Init smooth scrollbar
    const view = document.getElementById('view-main');
    const scrollbar = SmoothScrollbar.init(view, {
        renderByPixels: true,
        damping: 0.09
    });


    (function($) {
        $(".autoscroll-link").click(function(e) {
            var href = $(this).attr('href');
            scrollbar.scrollIntoView(document.querySelector(href), {
                offsetTop: 0,
                alignToTop: true,
            });
        });
    })(jQuery);


    // Hero section text scroll animations
    $(document).ready(function() {
        // Blue container
        (function() {
            let marqueeBlue = gsap.utils.toArray('.-blue .my-scroll-text');

            marqueeBlue.forEach((item, index) => {
                let distance = item.clientWidth;

                const tl = new gsap.timeline({});
                const tl2 = new gsap.timeline({});

                tl.to(item, 10, {
                    ease: "none",
                    xPercent: -100, //move each box 100% to left
                    modifiers: {
                        x: gsap.utils.unitize(x => parseFloat(x) % distance) //force x value to be between 0 and 500 using modulus
                    },
                    repeat: -1
                });

                tl2.fromTo(item, {
                    scale: 0.8,
                    duration: 0.65,
                    ease: "Power2.easeOut",
                }, {
                    scale: 1,
                    duration: 0.65,
                    ease: "Power2.easeOut",
                }, 0);

                // tl2.pause();

                $(".-right").hover(
                    function() {
                        $(".-star").addClass("-shape-change");
                        $(".-main").addClass("-hidden");
                        tl.pause();
                        tl2.pause();
                    },
                    function() {
                        $(".-star").removeClass("-shape-change");
                        $(".-main").removeClass("-hidden");
                        tl2.play(0);
                        tl2.play();
                        tl.play();
                    }
                );

                $(".-blue").hover(
                    function() {
                        $(".-blue .my-text-animation").addClass("-hidden");
                        tl.pause();
                        tl2.pause();
                    },
                    function() {
                        $(".-blue .my-text-animation").removeClass("-hidden");
                        tl2.play(0);
                        tl2.play();
                        tl.play();
                    }
                );

                $(".-yellow").hover(
                    function() {
                        $(".canvas").addClass("-shape-yellow");
                    },
                    function() {
                        $(".canvas").removeClass("-shape-yellow");
                    }
                );

                $(".-white").hover(
                    function() {
                        $(".canvas").addClass("-shape-white");
                    },
                    function() {
                        $(".canvas").removeClass("-shape-white");
                    }
                );

                $(".-dark").hover(
                    function() {
                        $(".canvas").addClass("-shape-dark");
                    },
                    function() {
                        $(".canvas").removeClass("-shape-dark");
                    }
                );
            });
        })();


        // Yellow container
        (function() {
            let marqueeYellow = gsap.utils.toArray('.-yellow .my-scroll-text');

            marqueeYellow.forEach((item, index) => {
                let distance = item.clientWidth;

                const tl = new gsap.timeline({});
                const tl2 = new gsap.timeline({});

                tl.to(item, 7, {
                    ease: "none",
                    xPercent: -100, //move each box 100% to left
                    modifiers: {
                        x: gsap.utils.unitize(x => parseFloat(x) % distance) //force x value to be between 0 and 500 using modulus
                    },
                    repeat: -1
                });

                tl2.fromTo(item, {
                    scale: 0.8,
                    duration: 0.65,
                    ease: "Power2.easeOut",
                }, {
                    scale: 1,
                    duration: 0.65,
                    ease: "Power2.easeOut",
                }, 0);

                tl.pause();
                tl2.pause();

                $(".-yellow").hover(
                    function() {
                        tl2.play(0);
                        tl2.play();
                        tl.play();
                    },
                    function() {
                        tl.pause();
                    }
                );
            });
        })();


        // White container
        (function() {
            let marqueeWhite = gsap.utils.toArray('.-white .my-scroll-text');

            marqueeWhite.forEach((item, index) => {
                let distance = item.clientWidth;

                const tl = new gsap.timeline({});
                const tl2 = new gsap.timeline({});

                tl.to(item, 4, {
                    ease: "none",
                    xPercent: -100, //move each box 100% to left
                    modifiers: {
                        x: gsap.utils.unitize(x => parseFloat(x) % distance) //force x value to be between 0 and 500 using modulus
                    },
                    repeat: -1
                });

                tl2.fromTo(item, {
                    scale: 0.8,
                    duration: 0.65,
                    ease: "Power2.easeOut",
                }, {
                    scale: 1,
                    duration: 0.65,
                    ease: "Power2.easeOut",
                }, 0);

                tl.pause();
                tl2.pause();

                $(".-white").hover(
                    function() {
                        tl2.play(0);
                        tl2.play();
                        tl.play();
                    },
                    function() {
                        tl.pause();
                    }
                );
            });
        })();

        // Dark container
        (function() {
            let marqueeDark = gsap.utils.toArray('.-dark .my-scroll-text');

            marqueeDark.forEach((item, index) => {
                let distance = item.clientWidth;

                const tl = new gsap.timeline({});
                const tl2 = new gsap.timeline({});

                tl.to(item, 4, {
                    ease: "none",
                    xPercent: -100, //move each box 100% to left
                    modifiers: {
                        x: gsap.utils.unitize(x => parseFloat(x) % distance) //force x value to be between 0 and 500 using modulus
                    },
                    repeat: -1
                });

                tl2.fromTo(item, {
                    scale: 0.8,
                    duration: 0.65,
                    ease: "Power2.easeOut",
                }, {
                    scale: 1,
                    duration: 0.65,
                    ease: "Power2.easeOut",
                }, 0);

                tl.pause();
                tl2.pause();

                $(".-dark").hover(
                    function() {
                        tl2.play(0);
                        tl2.play();
                        tl.play();
                    },
                    function() {
                        tl.pause();
                    }
                );
            });
        })();


        // Logo animation
        (function() {
            var container = document.querySelector('.my-logo');
            var trigger = document.querySelector('.my-navbar');

            const tl = new gsap.timeline({
                scrollTrigger: {
                    trigger: trigger,
                    scrub: true,
                    // anticipatePin: 1,
                    // pin: container,
                    // pinType: 'transform',
                    start: "top top",
                    end: "bottom top",
                    // markers: true,
                }
            });

            tl.to(container, {
                autoAlpha: 0,
                scale: 0.85,
                yPercent: 25,
                z: -100,
                // rotationX: 90,
                transformOrigin: "50% 50%",
                ease: "Power1.easeNone",
            }, 0);
        })();

        // Service circle animation
        (function() {
            var container = document.querySelector('.my-services-card');
            var circle = document.querySelector('.services-circle');

            const tl = new gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    scrub: true,
                    start: "top bottom",
                    end: "bottom top",
                }
            });

            tl.to(circle, {
                ease: "none",
                rotation: 360,
            }, 0);
        })();

        // Contact circle animation
        (function() {
            var container = document.querySelector('.my-contact-card');
            var circle = document.querySelector('.contact-circle');

            const tl = new gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    scrub: true,
                    start: "top bottom",
                    end: "bottom top",
                }
            });

            tl.to(circle, {
                ease: "none",
                rotation: 360,
            }, 0);
        })();

        (function() {
            let contain = gsap.utils.toArray('.my-services-row');

            contain.forEach((item, index) => {
                var className = $(item).attr('class');
                var left = item.querySelector('.' + className + ' .my-services-row__left');
                var right = item.querySelector('.' + className + ' .my-services-row__right');
                var card = item.querySelector('.' + className + ' .my-services-row__left' + '.my-services-row__left--card');
                var extension = item.querySelector('.' + className + ' .card-extension');

                const tl = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        scrub: .6,
                        start: "top bottom",
                        end: "center center",
                    }
                });

                tl.fromTo(extension, {
                    autoAlpha: 0,
                    ease: "none",
                }, {
                    delay: .2,
                    duration: .05,
                    autoAlpha: 1,
                    ease: "none",
                }, 0);

                tl.fromTo(left, {
                    xPercent: "50",
                    ease: "none",
                }, {
                    xPercent: 0,
                    ease: "none",
                }, 0);

                tl.fromTo(right, {
                    xPercent: -50,
                    ease: "none",
                }, {
                    xPercent: 0,
                    ease: "none",
                }, 0);
            });
        })();

        (function() {
            const marquee = document.querySelectorAll('.my-marquee');

            marquee.forEach((e) => {

                // Create swiper carousel
                const carousel = e.querySelectorAll('.my-marquee-carousel');

                carousel.forEach((e) => {
                    const items = e.querySelector('.my-marquee-items');
                    const item = e.querySelectorAll('.my-marquee-item');

                    e.classList.add('swiper-container');
                    items.classList.add('swiper-wrapper');
                    item.forEach(e => e.classList.add('swiper-slide'));

                    const slider = new Swiper(e, {
                        slidesPerView: 'auto',
                        loop: true,
                        loopedSlides: 10,
                        freeMode: {
                            enabled: true,
                            momentumBounce: false,
                            momentumVelocityRatio: 0.3
                        },
                    });
                });

                // Scroll triggered movement
                const tl = new gsap.timeline();

                tl.set(carousel, {
                    willChange: "transform"
                });

                tl.fromTo(carousel[0], {
                    x: -300
                }, {
                    x: 0,
                    ease: "none"
                }, 0);

                tl.fromTo(carousel[1], {
                    x: 300
                }, {
                    x: 0,
                    ease: "none"
                }, 0);

                tl.set(carousel, {
                    willChange: "auto"
                });

                ScrollTrigger.create({
                    trigger: ".my-who",
                    animation: tl,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.3,
                    refreshPriority: -14,
                    invalidateOnRefresh: true,
                })
            });
        })();

    });

    ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function() {
            if (document.querySelector(".reveal-card-zoom-delay")) {
                (function() {
                    let revealCard = document.querySelectorAll(".reveal-card-zoom-delay");

                    let revealCardBlock = revealCard.forEach((element) => {

                        let tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: element,
                                start: "top bottom",
                                scrub: false,
                            }
                        });

                        tl.fromTo(element, {
                            scale: 0.9,
                            opacity: 0,
                        }, {
                            scale: 1,
                            opacity: 1,
                            duration: 1.5,
                            delay: 0,
                            ease: "expo.out",
                        }, .3);
                    });
                })();
            }
        },

        "(max-width: 1023px)": function() {
            if (document.querySelector(".reveal-card-sm")) {
                (function() {
                    let revealCard = document.querySelectorAll(".reveal-card-sm");

                    let revealCardBlock = revealCard.forEach((element) => {

                        let tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: element,
                                start: "top bottom",
                                scrub: false,
                            }
                        });

                        tl.fromTo(element, {
                            scale: 0.9,
                            opacity: 0,
                        }, {
                            scale: 1,
                            opacity: 1,
                            duration: 1.5,
                            ease: "expo.out",
                        }, 0);
                    });
                })();
            }
        },

        "all": function() {
            // Home - page reveal

            $(document).ready(function() {
                (function() {
                    let container = document.querySelectorAll(".my-hero");
                    let logo = document.querySelectorAll(".my-logo svg");
                    // let main = document.querySelectorAll(".my-main");

                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: container,
                            start: "top bottom",
                            scrub: false,
                        }
                    });

                    tl.fromTo(logo, {
                        scale: 0.9,
                        opacity: 0,
                    }, {
                        scale: 1,
                        opacity: 1,
                        duration: 1.5,
                        delay: 0,
                        ease: "expo.out",
                    }, .3);
                })();
            });
        }
    });
};



// Shape animation
(function() {
    var container = document.querySelector('.my-shape .canvas');
    let shapes = gsap.utils.toArray('.my-shape .shape');
    // var trigger = document.querySelector('.dws-films');

    const tl = new gsap.timeline({});

    shapes.forEach((item, index) => {
        const tl2 = new gsap.timeline({});

        tl2.to(item, 13, {
            ease: "none",
            rotation: "360",
            repeat: -1
        });
    });

    tl.to(container, 9, {
        ease: "none",
        rotation: "360",
        repeat: -1
    });
})();



(function() {
    const work = document.querySelectorAll('.my-work');

    work.forEach((e) => {

        // Create swiper carousel
        const carousel = e.querySelectorAll('.my-work-carousel');

        carousel.forEach((e) => {
            const items = e.querySelector('.my-work-items');
            const item = e.querySelectorAll('.my-work-item');

            e.classList.add('swiper-container');
            items.classList.add('swiper-wrapper');
            item.forEach(e => e.classList.add('swiper-slide'));

            const workSlider = new Swiper(e, {
                slidesPerView: 2,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                loop: false,
                grabCursor: true,
                watchSlidesProgress: true,
                spaceBetween: 4,
                // freeMode: {
                //     enabled: true,
                //     minimumVelocity: 0,
                //     momentumBounce: false,
                //     momentumVelocityRatio: 0.3,
                //     sticky: true,
                // },

                breakpoints: {
                    500: {
                        spaceBetween: 8,
                    }
                },
            });
        });
    });
})();


// Who text scroll
(function() {
    let marqueeYellow = gsap.utils.toArray('.my-who-card .my-scroll-text');

    marqueeYellow.forEach((item, index) => {
        let distance = item.clientWidth;

        const tl = new gsap.timeline({});
        const tl2 = new gsap.timeline({});

        tl.to(item, 10, {
            ease: "none",
            xPercent: -100, //move each box 100% to left
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % distance) //force x value to be between 0 and 500 using modulus
            },
            repeat: -1
        });
    });
})();


// Loader animation
(function() {
    var container = document.querySelector('.my-layout');

    const tl = new gsap.timeline({});

    tl.fromTo(container, {
        opacity: 0,
    }, {
        opacity: 1,
        duration: 0.1,
        delay: 0,
        ease: "none",
    }, 0);
})();



if (document.querySelector(".reveal-card-zoom")) {
    (function() {
        let revealCard = document.querySelectorAll(".reveal-card-zoom");

        let revealCardBlock = revealCard.forEach((element) => {

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    scrub: false,
                }
            });

            tl.fromTo(element, {
                scale: 0.9,
            }, {
                scale: 1,
                duration: 1.5,
                ease: "expo.out",
            }, 0);
        });
    })();
}




// ============= SMOOTH SCROLL AT ANCHOR FOR MOBILE ==============

var $root = $('html, body');

$('a[href^="#"]').click(function() {
    $root.animate({
        scrollTop: $($.attr(this, 'href')).offset().top + 1
    }, 200);

    return false;
});



$(window).resize(function() {
    ScrollTrigger.refresh();
    ScrollTrigger.update();
});


$(document).ready(function() {
    ScrollTrigger.refresh();
    ScrollTrigger.update();
});

document.addEventListener("DOMContentLoaded", () => {
    ScrollTrigger.refresh();
    ScrollTrigger.update();
});