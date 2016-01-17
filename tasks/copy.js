module.exports = function (grunt) {
    'use strict';

    var config = {
        assets: {
            files: [
                {
                    expand: true,
                    cwd: '<%= config.assets %>',
                    src: ['images/**'],
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
        }
    };

    grunt.config.set('copy', config);
};
