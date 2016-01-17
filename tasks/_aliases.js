module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('develop', [
        'assemble:develop',
        'sass:develop',
        'uglify',
        'connect',
        'copy',
        'watch'
    ]);

    grunt.registerTask('test', [
        // 'htmllint',
        'jshint',
        'scsslint'
    ]);

    grunt.registerTask('deploy', [
        'clean',
        'assemble:deploy',
        'sass:deploy',
        's3',
        'rsync:production',
        'rsync:production_assets',
        'rsync:production_uploads',
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
