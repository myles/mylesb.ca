module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: grunt.file.readJSON('bower.json')
    });

    grunt.loadNpmTasks('assemble');

    grunt.task.loadTasks('./tasks/');
};
