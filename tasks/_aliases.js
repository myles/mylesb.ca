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

    grunt.registerTask('deploy', [
        'clean',
        'assemble:deploy',
        'sass:deploy',
        's3',
        'clean'
    ]);

    grunt.registerTask('staging', [
        'clean',
        'assemble:develop',
        'sass:develop',
        'rsync:staging',
        'clean'
    ]);

    grunt.registerTask('build', [
        'clean',
        'assemble:develop',
        'sass:develop'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
