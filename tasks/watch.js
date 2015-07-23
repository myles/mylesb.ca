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
                'source/partials/*.hbs',
                'source/partials/*.md',
                'source/layouts/*.hbs',
				'source/plain/*.hbs',
                'source/pages/*.hbs',
                'source/data/*.yml'
            ]
        },
        sass: {
            tasks: [
                'sass'
            ],
            files: [
                'source/assets/stylesheets/*.scss'
            ]
        },
        coffee: {
            tasks: [
                'coffee'
            ],
            files: [
                'source/assets/javascript/*.coffee'
            ]
        },
        images: {
            tasks: [
                'copy'
            ],
            files: [
                'source/assets/images/*.png',
                'source/assets/images/*.svg',
                'source/assets/images/*.jpg'
            ]
        }
    };
    
    grunt.config.set('watch', config);
};
