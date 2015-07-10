module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        assemble: {
            options: {
                layout: "source/layouts/default.hbs",
                flatten: true,
                production: false
            },
            pages: {
                files: {
                    'build/': [
                        'source/pages/*.hbs',
                        'source/pages/**/*.hbs'
                    ]
                }
            }
        },
        
    });
    
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    
    grunt.task.loadTasks('./tasks/');
};