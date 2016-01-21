module.exports = function (grunt) {
    'use strict';

    var config = {
        options: {
            args: ["--verbose"],
            recursive: true,
            exclude: ["*.scss"]
        },
        staging: {
            options: {
                src: "<%= config.destination %>",
                dest: "<%= config.deploy.stag.dest %>",
                host: "<%= config.deploy.stag.host %>",
                port: "<%= config.deploy.stag.port %>",
                delete: true
            }
        },
        production: {
            options: {
                src: "<%= config.destination %>",
                dest: "<%= config.deploy.prod.dest %>",
                host: "<%= config.deploy.prod.host %>",
                port: "<%= config.deploy.prod.port %>",
                delete: true
            }
        },
        production_favicon: {
            options: {
                src: "<%= config.source %>/assets/images/favicons/favicon.ico",
                dest: "<%= config.deploy.prod.dest %>",
                host: "<%= config.deploy.prod.host %>",
                port: "<%= config.deploy.prod.port %>"
            }
        },
        nfs: {
            options: {
                src: "<%= config.destination %>",
                dest: "<%= config.deploy.nfs.dest %>",
                host: "<%= config.deploy.nfs.host %>",
                port: "<%= config.deploy.nfs.port %>",
                delete: true
            }
        },
        nfs_favicon: {
            options: {
                src: "<%= config.source %>/assets/images/favicons/favicon.ico",
                dest: "<%= config.deploy.nfs.dest %>",
                host: "<%= config.deploy.nfs.host %>",
                port: "<%= config.deploy.nfs.port %>"
            }
        }
    };

    grunt.config.set('rsync', config);
};
