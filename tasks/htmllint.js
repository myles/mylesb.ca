module.exports = function (grunt) {
    'use strict';

    var config = {
        assemble: {
            options: {
                'htmllintrc': true
            },
            src: [
                '<%= config.source %>/**/*.hbs'
            ]
        }
    };

    grunt.config.set('htmllint', config);
};
