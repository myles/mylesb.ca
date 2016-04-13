module.exports = function (grunt) {
    'use strict';

    var config = {
        options: {
            args: ['--verbose'],
            recursive: true,
            exclude: ['.keep'],
            src: '<%= config.destination %>',
            delete: true
        },
        staging: {
            options: {
                dest: "<%= config.deploy.stag.dest %>",
                host: "<%= config.deploy.stag.host %>",
                port: "<%= config.deploy.stag.port %>"
            }
        },
        production: {
            options: {
                dest: "<%= config.deploy.prod.dest %>",
                host: "<%= config.deploy.prod.host %>",
                port: "<%= config.deploy.prod.port %>"
            }
        },
        nfs: {
            options: {
                dest: "<%= config.deploy.nfs.dest %>",
                host: "<%= config.deploy.nfs.host %>",
                port: "<%= config.deploy.nfs.port %>"
            }
        }
    };

    grunt.config.set('rsync', config);
};
