module.exports = function (grunt) {
    'use strict';

    var config = {
        options: {
            accessKeyId: "<%= aws.accessKeyId %>",
            secretAccessKey: "<%= aws.secretAccessKey %>",
            bucket: "mylesb.ca"
        },
        website: {
            cwd: "<%= config.destination %>",
            src: "**"
        },
        uploads: {
            cwd: "<%= config.source %>/uploads/",
            src: "**",
            dest: 'uploads/'
        },
        assets: {
            cwd: "<%= config.assets %>/images/",
            src: "**",
            dest: "assets/images/"
        }
    };

    grunt.config.set('s3', config);
};
