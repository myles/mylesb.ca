module.exports = function (grunt) {
    'use strict';

    var config = {
        options: {
            livereload: true
        },
        assemble: {
            files: [
                '<%= config.source %>/data/*.yaml',
                '<%= config.source %>/data/*.json',
                '<%= config.source %>/helpers/*.js',
                '<%= config.source %>/pages/*.hbs',
                '<%= config.source %>/templates/layouts/*.hbs',
                '<%= config.source %>/templates/partials/*.hbs'
            ],
            tasks: ['assemble:develop']
        },
        sass: {
            files: [
                '<%= config.source %>/source/assets/sass/*.scss',
                '<%= config.source %>/source/assets/sass/**/*.scss'
            ],
            tasks: ['sass:develop']
        }
    }

    grunt.config.set('watch', config);
};
