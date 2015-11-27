module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: grunt.file.readYAML('config.yaml')
    });

    grunt.loadNpmTasks('assemble');

    grunt.task.loadTasks('./tasks/');
};
