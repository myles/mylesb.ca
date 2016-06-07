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

$(document).ready(function() {
    'use strict';

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
                '<span class="number">$&</span>'
            )
        );
    });
});
