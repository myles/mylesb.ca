module.exports = function (grunt) {
    'use strict';

    var config = {
        all: [
            'Gruntfile.js',
            'tasks/*.js',
            '<%= config.source %>/assets/javascript/*.js'
        ]
    };

    grunt.config.set('jshint', config);
};
