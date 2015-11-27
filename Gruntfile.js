module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        aws: grunt.file.readJSON('.aws.json'),
        pkg: grunt.file.readJSON('package.json'),
        config: grunt.file.readYAML('config.yaml')
    });

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-aws');
    grunt.loadNpmTasks('grunt-htmllint');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.task.loadTasks('./tasks/');
};
