module.exports = function (grunt) {
    'use strict';

    var config = {
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
