module.exports = function (grunt) {
    grunt.registerTask('build', [
        'assemble',
        'sass',
        'coffee',
        'concat',
        'copy'
    ]);
    
    grunt.registerTask('run', [
        'build',
        'connect:server',
        'watch'
    ]);
    
    grunt.registerTask('compress', [
        'htmlmin',
        'cssmin',
        'uglify'
    ]);
    
    grunt.registerTask('deploy', [
        'clean',
        'build',
        'compress'
    ]);

    grunt.registerTask('default', [
        'run'
    ]);
};