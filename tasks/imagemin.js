module.exports = function (grunt) {
    var config = {
        dist: {
            files: [{
                expand: true,
                cwd: 'build/assets/images/',
                src: ['**/*.{png,jpg,gif,svg}'],
                dest: 'build/assets/images/'
            }]
        }
    };
    
    grunt.config.set('imagemin', config);
};
