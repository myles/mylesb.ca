module.exports = function (grunt) {
    'use strict';

    var config = {
        all: [
            'Gruntfile.js',
            'tasks/*.js',
            '<%= config.source %>/assets/javascript/script.js'
        ]
    };

    grunt.config.set('jshint', config);
};
