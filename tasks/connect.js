module.exports = function (grunt) {
    'use strict';

    var config = {
        server: {
            options: {
                port: 4000,
                livereload: true,
                hostname: '0.0.0.0',
                base: '<%= config.destination %>'
            }
        }
    }

    grunt.config.set('connect', config);
};
