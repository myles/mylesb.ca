module.exports = function (grunt) {
    'use strict';

    var files, loadPath, config;

    files = [{
        expand: true,
        cwd: '<%= config.source %>/assets/scss/',
        src: [
            'style.scss'
        ],
        dest: '<%= config.destination %>/assets/css/',
        ext: '.css'
    }];

    loadPath = [
        './bower_components/',
        '<%= config.source %>/assets/scss/'
    ];

    config = {
        develop: {
            options: {
                loadPath: loadPath,
                style: 'expanded'
            },
            files: files
        },
        build: {
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
