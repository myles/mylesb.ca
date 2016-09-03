/* jslint browser: true */
/* global  $,ga */

function trackOutboundLinkClicks(link) {
    'use strict';

    var href = link.attr('href'),
        noProtocol = href.replace(/http[s]?:\/\//, '');

    ga('send', 'event', {
        eventCategory: 'Outbound Link',
        eventAction: 'click',
        eventLabel: noProtocol
    });
}

$(function () {
});

$(document).ready(function() {
    'use strict';

    var menuToggle = $('#js-navigation-mobile-menu').unbind();
    $("#js-navigation-menu").removeClass("navigation__list--show");
    $("#js-navigation-menu").removeClass("navigation__list--mobile");

    menuToggle.on('click', function (e) {
        e.preventDefault();

        $("#js-navigation-menu").addClass("navigation__list--mobile");

        $("#js-navigation-menu").slideToggle(function () {
            if ($("#js-navigation-menu").is(":hidden")) {
                $("#js-navigation-menu").removeAttr("style");
            }
        });
    });

    $('.js-subject-select').on('change', function () {
        if ($('.js-subject-select :selected').val() == 'Interested in Hiring for a Project') {
            $('.js-deadline').show();
            $('.js-budget').show();
        } else {
            $('.js-deadline').hide();
            $('.js-budget').hide();
        }
    }).trigger('change');

    $('.js-deadline-input').on('change mousemove', function () {
        var months = $(this).val(),
            output_el = $('.js-deadline-output');

        if (months == '0') {
            output_el.text('Unknown');
        } else if (months == '1') {
            output_el.text('1 month');
        } else {
            output_el.text(months + ' months');
        }
    }).trigger('change');

    $('a:not([href*="' + document.domain + '"])').mousedown(function (event) {
        // Just in case, be safe and don't do anything
        if (ga === undefined) {
            return;
        }

        // Track the Event
        trackOutboundLinkClicks($(this));
    });

    var regexNumber = /(\d+)/g;

    $('.fingerprint').each(function(index) {
        var codeFingerprintText = $(this).text();
        $(this).html(
            codeFingerprintText.replace(
                regexNumber,
                '<span class="fingerprint__number">$&</span>'
            )
        );
    });
});
