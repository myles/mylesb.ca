module.exports = function (grunt) {
    'use strict';

    var config = {
        options: {
            livereload: true
        },
        assemble: {
            files: [
                '<%= config.source %>/data/*',
                '<%= config.source %>/helpers/*.js',
                '<%= config.source %>/pages/*.hbs',
                '<%= config.source %>/templates/layouts/*.hbs',
                '<%= config.source %>/templates/partials/*.hbs'
            ],
            tasks: ['assemble:develop']
        },
        sass: {
            files: [
                '<%= config.source %>/assets/scss/*.scss',
                '<%= config.source %>/assets/scss/**/*.scss'
            ],
            tasks: ['sass:develop']
        },
        javascript: {
            files: [
                '<%= config.assets %>/javascript/*.js',
                '<%= config.assets %>/javascript/**/*.js'
            ],
            tasks: ['uglify']
        },
        uploads: {
            files: [
                '<%= config.source %>/uploads/**'
            ],
            tasks: ['copy:uploads']
        }
    };

    grunt.config.set('watch', config);
};
