module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('develop', [
        'assemble:develop',
        'sass:develop',
        'connect',
        'watch'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'scsslint',
        'htmllint'
    ]);

    /*
      TODO Add the S3 and rsync deploy tasks here.
    */
    grunt.registerTask('deploy', [
        'assemble:deploy',
        'sass:deploy'
    ]);

    grunt.registerTask('default', [
        'develop'
    ]);
};
