module.exports = function (grunt) {
    var config = {
        dist: {
            options: {
                style: 'expanded',
                loadPath: [
                    'bower_components/bourbon/app/assets/stylesheets/',
                    'bower_components/neat/app/assets/stylesheets/',
                    'bower_components/normalize-scss/'
                ]
            },
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
