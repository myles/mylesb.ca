module.exports = function (grunt) {
    'use strict';

    var config = {
        assets: {
            files: [
                {
                    expand: true,
                    cwd: '<%= config.assets %>',
                    src: [
                        'javascript/jquery-2.2.0.min.js',
                        'javascript/featherlight-1.3.4.min.js'
                    ],
                    dest: '<%= config.destination %>/assets/'
                }
            ]
        },
        uploads: {
            files: [
                {
                    expand: true,
                    cwd: '<%= config.uploads %>',
                    src: ['**'],
                    dest: '<%= config.destination %>/uploads/'
                }
            ]
        },
        well_known: {
            files: [{
                expand: true,
                cwd: '<%= config.source %>/well-known',
                src: ['**'],
                dest: '<%= config.destination %>/.well-known/'
            }]
        },
        plain: {
            files: [{
                expand: true,
                cwd: '<%= config.source %>/plain',
                src: ['**'],
                dest: '<%= config.destination %>'
            }]
        }
    };

    grunt.config.set('copy', config);
};
