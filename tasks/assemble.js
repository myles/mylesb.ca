module.exports = function (grunt) {
    'use strict';

    var config = {
        options: {
            data: [
                '<%= config.source%>/data/*.{json,yaml}'
            ],
            flatten: true,
            helpers: '<%= config.source %>/helpers/*-helper.js',
            layoutdir: '<%= config.source %>/templates/layouts',
            partials: '<%= config.source %>/templates/partials/*.hbs',
            layout: 'default.hbs'
        },
        develop: {
            options: {
                dev: true,
                prod: false
            },
            files: [{
                expand: true,
                cwd: '<%= config.source %>/pages/',
                src: '**/*.hbs',
                dest: '<%= config.destination %>'
            }]
        },
        deploy: {
            options: {
                dev: false,
                prod: true
            },
            src: '<%= config.source %>/pages/',
            dest: '<%= config.destination %>'
        }
    };

    grunt.config.set('assemble', config)
};
