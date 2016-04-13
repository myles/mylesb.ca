module.exports = function (grunt) {
    'use strict';

    var config = {
        distribute: {
            options: {
                mode: 'tgz',
                archive: '<%= config.distribute %>/<%= pkg.name %>-v' +
                         grunt.template.today("yyyy-mm-dd") +
                         '.tar.gz'
            },
            files: [{
                expand: true,
                cwd: '<%= config.destination %>',
                src: ['**'],
                dest: '<%= pkg.name %>-v' +
                      grunt.template.today("yyyy-mm-dd")
            }]
        }
    };

    grunt.config.set('compress', config);
};
