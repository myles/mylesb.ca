module.exports = function (grunt) {
    var config = {
        compile: {
            options: {
                sourceMap: true
            },
            files: {
                'build/assets/javascript/application.js': [
                    'source/assets/javascript/application.coffee'
                ]
            }
        }
    };
    
    grunt.config.set('coffee', config);
};
