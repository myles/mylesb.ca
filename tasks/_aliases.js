module.exports = function (grunt) {
    'use strict';

    /*
      TODO Add the build tasks here.
    */
    grunt.registerTask('build', []);

    grunt.registerTask('develop', [
        'build'
    ]);

    /*
      TODO Add some test/lint tasks here.
    */
    grunt.registerTask('test', []);

    /*
      TODO Add the compress tasks here.
    */
    grunt.registerTask('compress', []);

    /*
      TODO Add the S3 and rsync deploy tasks here.
    */
    grunt.registerTask('deploy', [
        'clean',
        'build',
        'compress'
    ]);

    grunt.registerTask('default', [
        'develop'
    ]);
};
