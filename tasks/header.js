module.exports = function (grunt) {
    'use strict';

    var config = {
        stylesheet: {
            options: {
                text: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                      '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            files: {
                '<%= config.destination %>/assets/css/style.css':
                '<%= config.destination %>/assets/css/style.css'
            }
        }
    };

    grunt.config.set('header', config);
};
