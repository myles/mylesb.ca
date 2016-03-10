$(document).ready(function() {
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

    $('.avatar').featherlight();
});
