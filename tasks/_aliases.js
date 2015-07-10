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
    
    grunt.registerTask('deploy', [
        'clean',
        'build'
    ]);

    grunt.registerTask('default', [
        'run'
    ]);
};