module.exports = function (grunt) {
    var config = {
        dist: {
            files: {
                'build/assets/javascript/application.js': ['build/assets/javascript/application.js'],
                'build/assets/javascript/vendor.js': ['build/assets/javascript/vendor.js']
            }
        }
    };
    
    grunt.config.set('uglify', config);
};
