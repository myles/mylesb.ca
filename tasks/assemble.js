module.exports = function (grunt) {
    var config = {
        options: {
            layout: "source/layouts/default.hbs",
            flatten: true,
            production: false,
            data: 'source/data/*.yml',
            partials: [
                'source/partials/*.hbs',
                'source/partials/*.md'
            ]
        },
        pages: {
            files: {
                'build/': [
                    'source/pages/*.hbs',
                    'source/pages/**/*.hbs'
                ]
            }
        }
    };
    
    grunt.config.set('assemble', config);
};
