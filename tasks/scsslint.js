module.exports = function (grunt) {
    'use strict';

    var config = {
        allFiles: [
            '<%= config.source %>/assets/sass/*.scss',
            '<%= config.source %>/assets/sass/**/*.scss',
            '!<%= config.source %>/assets/sass/_featherlight.scss'
        ]
    };

    grunt.config.set('scsslint', config);
};
