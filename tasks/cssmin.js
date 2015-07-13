module.exports = function (grunt) {
    var config = {
        options: {
            shorthandCompacting: false,
            roundingPrecision: -1
        },
        target: {
            files: [{
                expand: true,
                cwd: 'build/assets/stylesheets/',
                dest: 'build/assets/stylesheets',
                src: ['*.css'],
                ext: '.css'
            }]
        }
    };
    
    grunt.config.set('cssmin', config);
};
