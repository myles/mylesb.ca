module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('develop', [
        'assemble:develop'
    ]);

    /*
      TODO Add some test/lint tasks here.
    */
    grunt.registerTask('test', []);

    /*
      TODO Add the S3 and rsync deploy tasks here.
    */
    grunt.registerTask('deploy', [
        'assemble:develop'
    ]);

    grunt.registerTask('default', [
        'develop'
    ]);
};
