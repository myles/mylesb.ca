module.exports = function (grunt) {
    'use strict';

    var config = {
        build: [
            '<%= config.destination %>/**/*',
            '!<%= config.destination %>/.keep'
        ]
    };

    grunt.config.set('clean', config);
};
