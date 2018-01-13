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
        './node_modules/',
        '<%= config.source %>/assets/scss/'
    ];

    config = {
        develop: {
            options: {
                includePaths: loadPath,
                style: 'expanded'
            },
            files: files
        },
        build: {
            options: {
                style: 'compressed',
                includePaths: loadPath,
                sourcemap: 'none'
            },
            files: files
        }
    };

    grunt.config.set('sass', config);
};
