module.exports = function (grunt) {
    'use strict';

    var config = {
        allFiles: [
            '<%= config.source %>/assets/scss/*.scss',
            '<%= config.source %>/assets/scss/**/*.scss'
        ]
    };

    grunt.config.set('scsslint', config);
};
