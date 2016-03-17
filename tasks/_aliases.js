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

    grunt.registerTask('deploy:s3', [
        's3:website',
        's3:favicons'
    ]);

    grunt.registerTask('deploy:prod', [
        'rsync:production',
        'rsync:production_favicon'
    ]);

    grunt.registerTask('deploy:nfs', [
        'rsync:nfs',
        'rsync:nfs_favicon'
    ]);

    grunt.registerTask('deploy', [
        // 'clean',
        'assemble:deploy',
        'sass:deploy',
        'uglify',
        //'favicons',
        'copy',
        'deploy:prod',
        'deploy:nfs',
        'deploy:s3',
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
