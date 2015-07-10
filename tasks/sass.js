module.exports = function (grunt) {
    var config = {
        dist: {
            files: [{
                expand: true,
                cwd: 'source/',
                src: ['assets/stylesheets/application.scss'],
                dest: 'build/',
                ext: '.css'
            }]
        }
    };
    
    grunt.config.set('sass', config);
};
