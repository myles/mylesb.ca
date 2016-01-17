module.exports = function (grunt) {
    'use strict';

    var files, loadPath, config;

    files = [{
        expand: true,
        cwd: '<%= config.source %>/assets/sass/',
        src: [
            'style.scss'
        ],
        dest: '<%= config.destination %>/assets/css/',
        ext: '.css'
    }];

    loadPath = [
        './bower_components/',
        '<%= config.source %>/assets/sass/'
    ];

    config = {
        develop: {
            options: {
                loadPath: loadPath,
                style: 'expanded'
            },
            files: files
        },
        deploy: {
            options: {
                style: 'compressed',
                loadPath: loadPath,
                sourcemap: 'none'
            },
            files: files
        }
    };

    grunt.config.set('sass', config);
};
