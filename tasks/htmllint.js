module.exports = function (grunt) {
    'use strict';

    var config = {
        src: [
            '<%= config.source %>/**/*.hbs'
        ]
    };

    grunt.config.set('htmllint', config);
};
