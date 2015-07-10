module.exports = function (grunt) {
    var config = {
        options: {
            livereload: true
        },
        html: {
            tasks: [
                'assemble'
            ],
            files: [
                'source/layouts/*.hbs',
                'source/pages/*.hbs'
            ]
        },
        sass: {
            tasks: [
                'sass'
            ],
            files: [
                'source/assets/stylesheets/*.scss'
            ]
        }
    };
    
    grunt.config.set('watch', config);
};
