module.exports = function (grunt) {
    var config = {
        compile: {
            files: {
                'build/assets/javascript/application.js': [
                    'source/assets/javascript/application.coffee'
                ]
            }
        }
    };
    
    grunt.config.set('coffee', config);
};
