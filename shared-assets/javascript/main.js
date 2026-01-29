jQuery(document).ready(function ($) {

    /* ================= NAVBAR SCROLL EFFECT ================= */
    $(window).on('scroll', function () {
        $('.navbar').toggleClass('scrolled', $(this).scrollTop() > 50);
        $('.scroll-top').toggleClass('show', $(this).scrollTop() > 300);
    });

    /* ================= SCROLL TO TOP ================= */
    $('.scroll-top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });

    /* ================= HAMBURGER ANIMATION ONLY ================= */
    $('.navbar-toggler').on('click', function () {
        $(this).toggleClass('active');
    });

    /* Keyboard toggle for hamburger */
    $('.navbar-toggler').on('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });

    /* ================= SMOOTH SCROLL ================= */
    $('a[href^="#"]').on('click', function (e) {
        const target = $(this).attr('href');
        if (target !== '#' && target !== '#home') {
            e.preventDefault();
            const el = $(target);
            if (el.length) {
                $('html, body').animate({ scrollTop: el.offset().top - 80 }, 600);
                el.attr('tabindex', '-1').focus();
            }

            // Close mobile menu after click
            $('.navbar-toggler').removeClass('active');
            $('#navbarNav').removeClass('show');
        }
    });

    /* ================= DESKTOP DROPDOWN HOVER ================= */
    function enableHoverDropdown() {
        if ($(window).width() > 1199) {
            $('.dropdown').off('mouseenter mouseleave').hover(
                function () {
                    $(this).addClass('show');
                    $(this).find('.dropdown-menu').addClass('show');
                },
                function () {
                    $(this).removeClass('show');
                    $(this).find('.dropdown-menu').removeClass('show');
                }
            );
        } else {
            $('.dropdown').off('mouseenter mouseleave');
        }
    }
    enableHoverDropdown();

    /* ================= MOBILE DROPDOWN CLICK (BOOTSTRAP FRIENDLY) ================= */
    $('.dropdown-toggle').on('click', function (e) {
        if ($(window).width() <= 1199) {
            e.preventDefault();
            e.stopPropagation();

            const parent = $(this).closest('.dropdown');
            const menu = parent.find('.dropdown-menu');

            $('.dropdown').not(parent).removeClass('show');
            $('.dropdown-menu').not(menu).removeClass('show');

            parent.toggleClass('show');
            menu.toggleClass('show');
        }
    });

    /* ================= WINDOW RESIZE RESET ================= */
    $(window).on('resize', function () {
        enableHoverDropdown();

        if ($(window).width() > 1199) {
            $('.dropdown').removeClass('show');
            $('.dropdown-menu').removeClass('show').removeAttr('style');
            $('.navbar-toggler').removeClass('active');
            $('#navbarNav').removeClass('show');
        }
    });

    /* ================= SEARCH OVERLAY ================= */
    $('#searchIcon').on('click', function () {
        $('#searchOverlay').addClass('active');
        $('body').css('overflow', 'hidden');
        setTimeout(() => $('#searchInput').focus(), 300);
    });

    $('#searchClose').on('click', function () {
        $('#searchOverlay').removeClass('active');
        $('body').css('overflow', '');
        $('#searchIcon').focus();
    });

    $('#searchOverlay').on('click', function (e) {
        if ($(e.target).is('#searchOverlay')) {
            $('#searchOverlay').removeClass('active');
            $('body').css('overflow', '');
        }
    });

    /* ================= SEARCH FORM ================= */
    $('.search-input-wrapper').on('submit', function (e) {
        e.preventDefault();
        const q = $('#searchInput').val().trim();
        if (q) alert('Searching for: ' + q);
    });

    /* ================= MOVE SEARCH ICON RESPONSIVE ================= */
    const $searchItem = $('#searchNavItem');
    const $navList = $searchItem.parent();

    function moveSearchIcon() {
        if ($(window).width() <= 1199) {
            $('body').append($searchItem);
        } else {
            $navList.append($searchItem);
        }
    }
    moveSearchIcon();
    $(window).on('resize', moveSearchIcon);


});
