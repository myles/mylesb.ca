module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('develop', [
        'favicons',
        'assemble:develop',
        'sass:develop',
        'uglify:develop',
        'copy',
        'imagemin',
        'connect',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'favicons',
        'assemble:build',
        'uglify:build',
        'sass:build',
        'htmlmin:build',
        'imagemin',
        'htmlmin',
        'copy'
    ]);

    grunt.registerTask('deploy', [
        'build',
        'rsync:staging'
    ]);

    grunt.registerTask('deploy:production', [
        'build',
        'rsync:production',
        'rsync:nfs'
    ]);

    grunt.registerTask('distribute', [
        'build',
        'compress:distribute'
    ]);

    grunt.registerTask('test', [
        // 'htmllint',
        'jshint',
        'scsslint'
    ]);

    grunt.registerTask('default', ['develop']);
};
