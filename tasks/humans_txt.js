module.exports = function (grunt) {
    'use strict';

    var config = {
        options: {
            commentStyle: 'u',
            content: {
                'team': [{
                    'Web Developer': 'Myles Braithwaite',
                    'Site': 'https://mylesb.ca/',
                    'Twitter': '@mylesb',
                    'Location': 'Toronto'
                }],
                'thanks': [],
                'site': [{
                    'Version': '<%= pkg.version %>',
                    'Site URL': 'https://mylesb.ca/',
                    'Language': 'English',
                    'Technology': 'node.js, assemble, nginx',
                    'Tools': 'photoshop, textmate'
                }]
            }
        },
        '<%= config.destination %>/humans.txt': 'dest'
    };

    grunt.config.set('humans_txt', config);
};
