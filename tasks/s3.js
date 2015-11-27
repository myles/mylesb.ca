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
        }
    };

    grunt.config.set('s3', config);
};
