module.exports = function (grunt) {
    'use strict';

    var config = {
        options: {
            accessKeyId: "<%= aws.accessKeyId %>",
            secretAccessKey: "<%= aws.secretAccessKey %>",
            bucket: "<%= config.deploy.aws.bucket %>"
        },
        website: {
            cwd: "<%= config.destination %>",
            src: "**"
        },
        favicons: {
            cwd: "<%= config.assets %>/images/favicons/",
            src: "favicon.ico"
        },
        well_known: {
            cwd: "<%= config.source %>/well-known/",
            src: "**",
            dest: ".well-known/"
        }
    };

    grunt.config.set('s3', config);
};
