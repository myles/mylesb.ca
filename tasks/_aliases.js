module.exports = function (grunt) {
    grunt.registerTask('build', [
        'assemble',
        'sass',
        'coffee',
        'concat',
        'copy',
        'responsive_images'
    ]);
    
    grunt.registerTask('run', [
        'build',
        'connect:server',
        'watch'
    ]);
	
	grunt.registerTask('lint', [
		'mdlint',
		'htmllint',
		'scsslint',
		'coffeelint'
	]);
    
    grunt.registerTask('compress', [
        'htmlmin',
        'cssmin',
        'uglify',
        'imagemin'
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