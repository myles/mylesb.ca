module.exports = function (grunt) {
    'use strict';

    var config = {
        options: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        target: {
            files: {
                '<%= config.destination %>/assets/javascript/script.js': [
                    '<%= config.assets %>/javascript/script.js'
                ]
            }
        }
    };

    grunt.config.set('uglify', config);
};
