module.exports = function (grunt) {
    'use strict';

    var config = {
        images: {
            files: [{
                expand: true,
                cwd: '<%= config.source %>',
                src: ['**/*.{png,jpg,gif,svg,ico}'],
                dest: '<%= config.destination %>'
            }]
        }
    };

    grunt.config.set('imagemin', config);
};
