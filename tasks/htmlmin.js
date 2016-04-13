module.exports = function (grunt) {
    'use strict';

    var config = {
        build: {
            options: {
                removeComments: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                minifyCSS: true,
                minifyJS: true,
                processScripts: ['application/ld+json']
            },
            files: [{
                expand: true,
                cwd: '<%= config.destination %>',
                src: ['**/*.html'],
                dest: '<%= config.destination %>'
            }]
        }
    };

    grunt.config.set('htmlmin', config);
};
