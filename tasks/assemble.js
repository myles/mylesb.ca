module.exports = function (grunt) {
    'use strict';

    var config, files;

    files = [{
        expand: true,
        cwd: '<%= config.source %>/pages/',
        src: '**/*.hbs',
        dest: '<%= config.destination %>'
    }];

    config = {
        options: {
            plugins: [
                'grunt-assemble-sitemap',
                'grunt-assemble-permalinks'
            ],
            data: [
                './config.yaml',
                '<%= config.source %>/data/*.{json,yml}'
            ],
            flatten: true,
            helpers: '<%= config.source %>/helpers/helpers-*.js',
            layoutdir: '<%= config.source %>/templates/layouts',
            partials: [
                '<%= config.source %>/templates/partials/*.hbs'
            ],
            layout: 'page.hbs',
            permalinks: {
                structure: ':basename/index.html'
            },
            sitemap: {
                homepage: '<%= config.url %>',
                changefreq: 'weekly',
                relativedest: true,
                robot: true
            }
        },
        develop: {
            options: {
                dev: true,
                production: false
            },
            files: files
        },
        build: {
            options: {
                dev: false,
                production: true
            },
            files: files
        }
    };

    grunt.config.set('assemble', config);
};
